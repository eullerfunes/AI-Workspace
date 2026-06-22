import { Scissors, Calendar, Users, BarChart3, Shield, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">BarberFlow</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</a>
            <a href="/register" className="btn-primary">Começar Grátis</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_hsl(var(--primary)/0.06),_transparent_50%)]" />
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              Gerencie sua barbearia com <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">inteligência</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              O sistema completo para barbearias modernas. Agendamentos online, gestão de clientes, 
              controle financeiro e muito mais em uma única plataforma.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/register" className="btn-primary w-full sm:w-auto">Testar Grátis por 14 dias</a>
              <button className="btn-secondary w-full sm:w-auto">Ver Demonstração</button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="section-title">Tudo o que sua barbearia precisa</h2>
          <p className="section-subtitle">
            Funcionalidades pensadas para simplificar o dia a dia e aumentar seus resultados.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            { icon: Calendar, title: 'Agendamento Online', description: 'Seus clientes agendam 24/7 pelo site, sem ligações ou mensagens.' },
            { icon: Users, title: 'Gestão de Clientes', description: 'CRM completo com histórico de atendimentos e preferências.' },
            { icon: BarChart3, title: 'Dashboard Inteligente', description: 'Métricas em tempo real para tomar as melhores decisões.' },
            { icon: Shield, title: 'Multi-tenant Seguro', description: 'Dados isolados por barbearia com segurança de ponta.' },
            { icon: Clock, title: 'Controle de Horários', description: 'Evite conflitos de agendamento automaticamente.' },
            { icon: Scissors, title: 'Pronto para Produção', description: 'Arquitetura escalável, código limpo e fácil de manter.' }
          ].map((feature, index) => (
            <div key={index} className="group relative rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/40">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 lg:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-16 sm:px-12 sm:py-20 text-center shadow-sm">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.1),_transparent_60%)]" />
          <h2 className="section-title mb-4">Pronto para modernizar sua barbearia?</h2>
          <p className="section-subtitle mb-10">
            Junte-se a centenas de barbearias que já estão usando o BarberFlow para crescer.
          </p>
          <a href="/register" className="btn-primary">Criar Conta Gratuita</a>
        </div>
      </section>

      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
              <Scissors className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">BarberFlow</span>
          </div>
          <p>© 2024 BarberFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
