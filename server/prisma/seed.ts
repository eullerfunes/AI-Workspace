import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Criar tenant de exemplo
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'barbearia-modelo' },
    update: {},
    create: {
      name: 'Barbearia Modelo',
      slug: 'barbearia-modelo',
      phone: '(65) 99999-0000',
      email: 'contato@barbeariamodelo.com',
      whatsapp: '5565999990000',
      primaryColor: '#6C63FF',
      planType: 'FREE',
      status: 'ACTIVE',
    },
  });

  console.log(`✅ Tenant criado: ${tenant.name}`);

  // Criar admin
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'admin@barberflow.com' } },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Admin',
      email: 'admin@barberflow.com',
      passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log(`✅ Admin criado: ${admin.email} / senha: admin123`);

  // Criar barbeiros
  const barbers = await Promise.all([
    prisma.barber.create({
      data: {
        tenantId: tenant.id,
        name: 'Carlos Silva',
        specialties: JSON.stringify(['Corte Clássico', 'Barba', 'Hidratação']),
        workingDays: JSON.stringify([1, 2, 3, 4, 5, 6]),
        startTime: '08:00',
        endTime: '18:00',
        commissionPercent: 40,
        color: '#6C63FF',
        isActive: true,
      },
    }),
    prisma.barber.create({
      data: {
        tenantId: tenant.id,
        name: 'Rafael Oliveira',
        specialties: JSON.stringify(['Corte Degradê', 'Barba', 'Sobrancelha']),
        workingDays: JSON.stringify([1, 2, 3, 4, 5]),
        startTime: '09:00',
        endTime: '19:00',
        commissionPercent: 45,
        color: '#FF6B6B',
        isActive: true,
      },
    }),
    prisma.barber.create({
      data: {
        tenantId: tenant.id,
        name: 'Lucas Santos',
        specialties: JSON.stringify(['Corte Infantil', 'Barba', 'Pigmentação']),
        workingDays: JSON.stringify([1, 2, 3, 4, 5, 6]),
        startTime: '08:00',
        endTime: '17:00',
        commissionPercent: 35,
        color: '#4ECDC4',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${barbers.length} barbeiros criados`);

  // Criar serviços
  const services = await Promise.all([
    prisma.service.create({
      data: {
        tenantId: tenant.id,
        name: 'Corte Clássico',
        description: 'Corte tradicional com tesoura e máquina',
        price: 50,
        duration: 30,
        color: '#6C63FF',
        category: 'Corte',
        commissionPercent: 40,
      },
    }),
    prisma.service.create({
      data: {
        tenantId: tenant.id,
        name: 'Corte Degradê',
        description: 'Corte degradê moderno com máquina',
        price: 60,
        duration: 40,
        color: '#FF6B6B',
        category: 'Corte',
        commissionPercent: 40,
      },
    }),
    prisma.service.create({
      data: {
        tenantId: tenant.id,
        name: 'Barba',
        description: 'Aparação e modelagem de barba',
        price: 30,
        duration: 20,
        color: '#4ECDC4',
        category: 'Barba',
        commissionPercent: 40,
      },
    }),
    prisma.service.create({
      data: {
        tenantId: tenant.id,
        name: 'Corte + Barba',
        description: 'Combo corte clássico com barba',
        price: 70,
        duration: 45,
        color: '#FFE66D',
        category: 'Combo',
        commissionPercent: 40,
      },
    }),
    prisma.service.create({
      data: {
        tenantId: tenant.id,
        name: 'Hidratação Capilar',
        description: 'Hidratação profunda para cabelos',
        price: 40,
        duration: 30,
        color: '#95E1D3',
        category: 'Tratamento',
        commissionPercent: 30,
      },
    }),
    prisma.service.create({
      data: {
        tenantId: tenant.id,
        name: 'Sobrancelha',
        description: 'Design e modelagem de sobrancelha',
        price: 20,
        duration: 15,
        color: '#F38181',
        category: 'Estética',
        commissionPercent: 30,
      },
    }),
  ]);

  console.log(`✅ ${services.length} serviços criados`);

  // Criar clientes de exemplo
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        tenantId: tenant.id,
        name: 'João Pereira',
        phone: '(65) 99999-0001',
        whatsapp: '5565999990001',
        email: 'joao@email.com',
        isVip: true,
      },
    }),
    prisma.client.create({
      data: {
        tenantId: tenant.id,
        name: 'Maria Souza',
        phone: '(65) 99999-0002',
        whatsapp: '5565999990002',
        email: 'maria@email.com',
      },
    }),
    prisma.client.create({
      data: {
        tenantId: tenant.id,
        name: 'Pedro Alves',
        phone: '(65) 99999-0003',
        whatsapp: '5565999990003',
      },
    }),
    prisma.client.create({
      data: {
        tenantId: tenant.id,
        name: 'Ana Costa',
        phone: '(65) 99999-0004',
        whatsapp: '5565999990004',
        email: 'ana@email.com',
        isVip: true,
      },
    }),
    prisma.client.create({
      data: {
        tenantId: tenant.id,
        name: 'Lucas Mendes',
        phone: '(65) 99999-0005',
        whatsapp: '5565999990005',
      },
    }),
  ]);

  console.log(`✅ ${clients.length} clientes criados`);

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📋 Credenciais de acesso:');
  console.log('   Email: admin@barberflow.com');
  console.log('   Senha: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });