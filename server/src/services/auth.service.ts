import bcrypt from 'bcryptjs';
import { authRepository } from '../repositories/auth.repository';
import { generateTokenPair, verifyRefreshToken, JwtPayload } from '../utils/jwt';
import { UnauthorizedError, ConflictError } from '../utils/errors';
import type { RegisterInput, LoginInput } from '../validators/auth';

export const authService = {
  async register(data: RegisterInput) {
    const existingTenant = await authRepository.findTenantBySlug(data.tenantSlug);
    if (existingTenant) {
      throw new ConflictError('Esta barbearia já está cadastrada');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const tenant = await authRepository.createTenant({
      name: data.tenantName,
      slug: data.tenantSlug,
    });

    const user = await authRepository.createUser({
      tenantId: tenant.id,
      name: data.name,
      email: data.email,
      passwordHash,
      role: 'ADMIN',
    });

    const tokenPayload: JwtPayload = {
      userId: user.id,
      tenantId: tenant.id,
      role: user.role,
    };

    const tokens = generateTokenPair(tokenPayload);

    await authRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
      },
      ...tokens,
    };
  },

  async login(data: LoginInput) {
    const user = await authRepository.findUserByEmail('', data.email);
    
    if (!user) {
      // Tenta buscar sem tenantId (login unificado)
      const users = await authRepository.findUserByEmail('', data.email);
      if (!users) {
        throw new UnauthorizedError('Email ou senha inválidos');
      }
    }

    const foundUser = await authRepository.findUserByEmail('', data.email);
    if (!foundUser || !foundUser.isActive) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    const isValidPassword = await bcrypt.compare(data.password, foundUser.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    const tokenPayload: JwtPayload = {
      userId: foundUser.id,
      tenantId: foundUser.tenantId,
      role: foundUser.role,
    };

    const tokens = generateTokenPair(tokenPayload);

    await authRepository.updateRefreshToken(foundUser.id, tokens.refreshToken);
    await authRepository.updateLastLogin(foundUser.id);

    return {
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatarUrl: foundUser.avatarUrl,
      },
      tenant: foundUser.tenant ? {
        id: foundUser.tenant.id,
        name: foundUser.tenant.name,
        slug: foundUser.tenant.slug,
        logo: foundUser.tenant.logo,
        primaryColor: foundUser.tenant.primaryColor,
      } : null,
      ...tokens,
    };
  },

  async refreshAccessToken(refreshToken: string) {
    let payload: JwtPayload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    const user = await authRepository.findUserById(payload.userId);
    if (!user || !user.isActive || user.refreshToken !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const tokenPayload: JwtPayload = {
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
    };

    const tokens = generateTokenPair(tokenPayload);
    await authRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  },

  async logout(userId: string) {
    await authRepository.updateRefreshToken(userId, null);
  },

  async getProfile(userId: string) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatarUrl: user.avatarUrl,
      tenant: user.tenant ? {
        id: user.tenant.id,
        name: user.tenant.name,
        slug: user.tenant.slug,
        logo: user.tenant.logo,
        primaryColor: user.tenant.primaryColor,
        planType: user.tenant.planType,
        status: user.tenant.status,
      } : null,
    };
  },
};