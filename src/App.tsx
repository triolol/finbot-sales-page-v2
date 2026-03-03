import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Check, 
  ChevronRight,
  Shield, 
  Headphones, 
  Zap, 
  TrendingUp, 
  PiggyBank,
  MessageCircle,
  Smartphone,
  BarChart3,
  Star,
  ArrowRight,
  Wallet,
  FileText,
  CreditCard,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          return { minutes: 15, seconds: 0 };
        }
        if (prev.seconds === 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: prev.minutes, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Testimonial auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const testimonials = [
    {
      text: "Eu recebia bem, mas nunca sobrava nada. Depois que comecei a usar o FinBot, comecei a ver pra onde meu dinheiro ia. Em 2 meses consegui guardar mais de R$600.",
      author: "Carlos M.",
      location: "São Paulo",
      rating: 5
    },
    {
      text: "Eu odeio planilha. O FinBot resolveu minha vida porque é tudo no WhatsApp. Simples, rápido e eu uso todo dia.",
      author: "Juliana R.",
      location: "Minas Gerais",
      rating: 5
    },
    {
      text: "Tenho pequeno negócio e vivia misturando conta pessoal com empresa. Agora tenho tudo organizado. Melhor investimento que fiz esse ano.",
      author: "Rafael S.",
      location: "Bahia",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Precisa instalar algum app?",
      answer: "Não! O FinBot funciona 100% dentro do WhatsApp, tanto no celular quanto no computador. Basta ter o WhatsApp instalado e começar a conversar."
    },
    {
      question: "É seguro informar meus dados?",
      answer: "Sim! Utilizamos criptografia de ponta a ponta e seguimos rigorosos protocolos de segurança. Seus dados financeiros são criptografados e armazenados de forma segura."
    },
    {
      question: "Posso usar para empresa?",
      answer: "Sim! O FinBot é ideal para MEIs, autônomos e pequenos empresários. Você pode separar gastos pessoais de empresariais e ter relatórios detalhados."
    },
    {
      question: "Como recebo o acesso?",
      answer: "Imediatamente após a confirmação do pagamento, você recebe um link no WhatsApp para começar a usar o FinBot. É super rápido!"
    },
    {
      question: "E se eu não entender de tecnologia?",
      answer: "Não se preocupe! A interface é extremamente simples - é como conversar com um amigo. E nosso suporte humano está sempre disponível para ajudar."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER STICKY */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHeaderScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img 
                src="/finbot-logo.png" 
                alt="FinBot" 
                className="w-10 h-10 object-contain"
              />
              <span className={`font-bold text-xl transition-colors ${
                isHeaderScrolled ? 'text-[#111111]' : 'text-white'
              }`}>FinBot</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { label: 'Como Funciona', id: 'como-funciona' },
                { label: 'Benefícios', id: 'beneficios' },
                { label: 'Depoimentos', id: 'depoimentos' },
                { label: 'Planos', id: 'planos' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-[#25D366] ${
                    isHeaderScrolled ? 'text-[#111111]' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden lg:block">
              <a
                href="https://pay.kiwify.com.br/myRjIBO"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-3 px-6"
              >
                QUERO ORGANIZAR MINHAS FINANÇAS AGORA
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`lg:hidden p-2 transition-colors ${
                isHeaderScrolled ? 'text-[#111111]' : 'text-white'
              }`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <img 
              src="/finbot-logo.png" 
              alt="FinBot" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-xl text-[#111111]">FinBot</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={24} className="text-[#111111]" />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {[
            { label: 'Como Funciona', id: 'como-funciona' },
            { label: 'Benefícios', id: 'beneficios' },
            { label: 'Depoimentos', id: 'depoimentos' },
            { label: 'Planos', id: 'planos' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-lg font-medium text-[#111111] py-2 hover:text-[#25D366] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-8">
          <a
            href="https://pay.kiwify.com.br/myRjIBO"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full block text-center"
          >
            QUERO COMEÇAR AGORA
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="hero-gradient min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up">
                CANSADO DE RECEBER BEM E NUNCA SOBRAR NADA?
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Organize suas finanças em 2 minutos por dia, direto no WhatsApp. 
                Sem planilha, sem app complicado, sem desculpa.
              </p>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <a
                  href="https://pay.kiwify.com.br/myRjIBO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg py-4 px-8 inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  QUERO COMEÇAR AGORA
                  <ArrowRight size={20} />
                </a>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="trust-badge text-gray-400">
                  <Shield size={18} />
                  <span>Pagamento seguro</span>
                </div>
                <div className="trust-badge text-gray-400">
                  <Headphones size={18} />
                  <span>Suporte humano</span>
                </div>
                <div className="trust-badge text-gray-400">
                  <Zap size={18} />
                  <span>Acesso imediato</span>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center animate-float">
              <div className="phone-mockup bg-[#075E54] w-[280px] h-[500px] relative" style={{ borderRadius: '24px', border: '8px solid #111' }}>
                {/* WhatsApp Header */}
                <div className="bg-[#128C7E] p-3 flex items-center gap-3 rounded-t-[16px]">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/finbot-logo.png" alt="FinBot" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">FinBot</p>
                    <p className="text-green-200 text-xs">online</p>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="p-3 space-y-2 overflow-hidden">
                  <div className="bg-[#DCF8C6] rounded-lg p-2 ml-auto max-w-[85%] rounded-tr-sm">
                    <p className="text-sm text-[#111111]">Entrou 2000</p>
                    <p className="text-[10px] text-gray-500 text-right">10:54</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-2 max-w-[90%] rounded-tl-sm">
                    <p className="text-xs text-[#111111]">
                      <span className="text-green-600">✓</span> Transação registrada!<br/>
                      <span className="text-lg">💰</span> Tipo: Entrada<br/>
                      <span className="text-lg">📊</span> Saldo: R$2.000,00
                    </p>
                    <p className="text-[10px] text-gray-500 text-right">10:55</p>
                  </div>

                  <div className="bg-[#DCF8C6] rounded-lg p-2 ml-auto max-w-[85%] rounded-tr-sm">
                    <p className="text-sm text-[#111111]">Uber 40</p>
                    <p className="text-[10px] text-gray-500 text-right">10:56</p>
                  </div>

                  <div className="bg-white rounded-lg p-2 max-w-[90%] rounded-tl-sm">
                    <p className="text-xs text-[#111111]">
                      <span className="text-lg">🧾</span> Registrado: saída R$40,00<br/>
                      Transporte (Uber)<br/>
                      <span className="text-lg">📊</span> Saldo: R$1.960,00
                    </p>
                    <p className="text-[10px] text-gray-500 text-right">10:57</p>
                  </div>
                </div>

                {/* Input */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#F0F0F0] p-2 flex items-center gap-2 rounded-b-[16px]">
                  <div className="flex-1 bg-white rounded-full px-3 py-2">
                    <p className="text-gray-400 text-xs">Mensagem</p>
                  </div>
                  <div className="w-8 h-8 bg-[#128C7E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📎</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DOR (PROBLEMA) */}
      <section className="py-16 lg:py-24 bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] text-center mb-12 reveal">
            VOCÊ RECONHECE ALGUMA DESSAS SITUAÇÕES?
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Wallet size={40} />, text: "Fim do mês chega e você não sabe onde foi seu dinheiro" },
              { icon: <PiggyBank size={40} />, text: "Prometeu começar a guardar, mas nunca sobra nada" },
              { icon: <CreditCard size={40} />, text: "Tem medo de olhar a fatura do cartão" },
              { icon: <FileText size={40} />, text: "Já tentou planilha, app, caderninho... e desistiu em 3 dias" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="card-hover bg-[#F5F5F5] rounded-xl p-6 text-center reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-[#25D366] mb-4 flex justify-center">
                  {item.icon}
                </div>
                <p className="text-[#111111] font-medium">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal">
            <a
              href="https://pay.kiwify.com.br/myRjIBO"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              CHEGA DE PERDER DINHEIRO
            </a>
          </div>
        </div>
      </section>

      {/* OFERTA (PLANOS) */}
      <section id="planos" className="py-16 lg:py-24 green-gradient" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
              ESCOLHA SEU PLANO
            </h2>
            <p className="text-white/80 text-lg">
              Acesso imediato. Comece em segundos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Plano Mensal */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 reveal card-hover">
              <h3 className="text-xl font-bold text-[#111111] mb-2">PLANO MENSAL</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-[#111111]">R$27</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Acesso completo",
                  "Suporte via WhatsApp",
                  "Atualizações automáticas",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <Check size={18} className="text-[#25D366]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://pay.kiwify.com.br/myRjIBO"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full block text-center"
              >
                ESCOLHER MENSAL
              </a>
            </div>

            {/* Plano Trimestral */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 reveal card-hover relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#111111] text-white text-xs font-bold px-4 py-1 rounded-full">
                  POPULAR
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2">PLANO TRIMESTRAL</h3>
              <div className="mb-2">
                <span className="text-4xl font-black text-[#111111]">R$47</span>
                <span className="text-gray-500">/3 meses</span>
              </div>
              <p className="text-[#25D366] font-semibold text-sm mb-6">Economize R$34</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Tudo do mensal",
                  "Relatórios avançados",
                  "Prioridade no suporte",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <Check size={18} className="text-[#25D366]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://pay.kiwify.com.br/utRqMh0"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full block text-center"
              >
                ESCOLHER TRIMESTRAL
              </a>
            </div>

            {/* Plano Anual - DESTAQUE */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 reveal relative md:scale-105 md:-mt-4 md:mb-4" 
                 style={{ 
                   boxShadow: '0 20px 40px rgba(37, 211, 102, 0.3)',
                   border: '2px solid #FFD600'
                 }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FFD600] text-[#111111] text-xs font-black px-4 py-2 rounded-full badge-pulse">
                  MELHOR CUSTO-BENEFÍCIO
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2">PLANO ANUAL</h3>
              <div className="mb-2">
                <span className="text-4xl font-black text-[#111111]">R$97</span>
                <span className="text-gray-500">/ano</span>
              </div>
              <p className="text-[#25D366] font-semibold text-sm mb-6">Economize R$227 (72% OFF)</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Tudo dos outros planos",
                  "Consultoria mensal",
                  "Grupo exclusivo",
                  "Acesso vitalício aos relatórios",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <Check size={18} className="text-[#25D366]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://pay.kiwify.com.br/RZ6mqe4"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full block text-center"
                style={{ backgroundColor: '#FFE066' }}
              >
                ESCOLHER ANUAL
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÃO (APRESENTAÇÃO) */}
      <section className="py-16 lg:py-24 bg-[#F5F5F5]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] mb-4">
              CONHEÇA O FINBOT
            </h2>
            <p className="text-lg text-gray-600">
              Seu assistente financeiro pessoal dentro do WhatsApp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Zap size={48} />, title: "Registra em 5 segundos", desc: "Só mandar uma mensagem simples" },
              { icon: <BarChart3 size={48} />, title: "Visualiza seus gastos", desc: "Gráficos e relatórios automáticos" },
              { icon: <PiggyBank size={48} />, title: "Guarda dinheiro sem sentir", desc: "Metas de economia que funcionam" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center reveal"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#111111] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Print Placeholder */}
          <div className="flex justify-center reveal">
            <div className="bg-[#111111] rounded-2xl p-4 w-full max-w-md">
              <div className="bg-[#075E54] rounded-xl overflow-hidden">
                <div className="bg-[#128C7E] p-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/finbot-logo.png" alt="FinBot" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="text-white font-semibold text-sm">FinBot</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="bg-white rounded-lg p-2 max-w-[90%]">
                    <p className="text-xs text-[#111111]">
                      <span className="text-green-600">✓</span> 3 transações registradas!<br/>
                      <span className="text-xl">🧾</span> Uber: R$40,00<br/>
                      <span className="text-xl">🧾</span> Academia: R$270,00<br/>
                      <span className="text-xl">💰</span> Entrada: R$1.500,00
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-2 max-w-[90%]">
                    <p className="text-xs text-[#111111]">
                      <span className="text-xl">📊</span> Saldo atualizado: R$3.190,00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA (PASSO A PASSO) */}
      <section id="como-funciona" className="py-16 lg:py-24 bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] text-center mb-12 reveal">
            EM 3 PASSOS, VOCÊ NO COMANDO
          </h2>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {[
              { 
                step: "1", 
                icon: <Smartphone size={48} />, 
                title: "Acesse o link e comece agora",
                desc: "Escolha seu plano e faça o pagamento seguro"
              },
              { 
                step: "2", 
                icon: <MessageCircle size={48} />, 
                title: "Fale com o FinBot no WhatsApp",
                desc: "Receba o link de acesso imediato no seu WhatsApp"
              },
              { 
                step: "3", 
                icon: <TrendingUp size={48} />, 
                title: "Registre gastos e veja sua vida financeira mudar",
                desc: "Comece a enviar mensagens e organize tudo"
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center reveal" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="w-16 h-16 bg-[#FFD600] rounded-full flex items-center justify-center mx-auto mb-4 text-[#111111] font-black text-2xl">
                    {item.step}
                  </div>
                  <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight size={32} className="text-[#25D366]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <a
              href="https://pay.kiwify.com.br/myRjIBO"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              QUERO MEU ACESSO AGORA
            </a>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="py-16 lg:py-24 bg-[#111111]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white text-center mb-12 reveal">
            O QUE VOCÊ VAI CONQUISTAR
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              "Clareza total dos seus gastos em tempo real",
              "Controle sem complicação (só mandar mensagem)",
              "Identificação de \"furos\" no orçamento",
              "Metas de economia que realmente funcionam",
              "Relatórios automáticos toda semana",
              "Suporte humano quando precisar",
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check size={16} className="text-white" />
                </div>
                <p className="text-white text-lg">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal">
            <a
              href="https://pay.kiwify.com.br/myRjIBO"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              COMEÇAR MINHA TRANSFORMAÇÃO
            </a>
          </div>
        </div>
      </section>

      {/* PRINTS WHATSAPP (GALERIA) */}
      <section className="py-16 lg:py-24 bg-[#F5F5F5]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] text-center mb-4 reveal">
            VEJA COMO É SIMPLES
          </h2>
          <p className="text-center text-gray-600 mb-12 reveal">
            Conversas reais de usuários com o FinBot
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { msg: "Entrou 2000", resp: "Transação registrada! Saldo: R$2.000,00" },
              { msg: "Uber 40", resp: "Registrado: saída R$40,00 - Transporte" },
              { msg: "Pizza 80", resp: "Registrado: saída R$80,00 - Alimentação" },
              { msg: "Relatório", resp: "📊 Resumo Atual: Entradas: R$2.000,00 | Saídas: R$120,00" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-[#111111] rounded-2xl p-4 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-[#075E54] rounded-xl overflow-hidden">
                  <div className="bg-[#128C7E] p-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <img src="/finbot-logo.png" alt="FinBot" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="text-white font-semibold text-sm">FinBot</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="bg-[#DCF8C6] rounded-lg p-2 ml-auto max-w-[70%]">
                      <p className="text-xs text-[#111111]">{item.msg}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 max-w-[90%]">
                      <p className="text-xs text-[#111111]">{item.resp}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center reveal">
            <a
              href="https://pay.kiwify.com.br/myRjIBO"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              QUERO USAR ASSIM TAMBÉM
            </a>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS (CARROSSEL) */}
      <section id="depoimentos" className="py-16 lg:py-24 bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] text-center mb-12 reveal">
            QUEM USA, RECOMENDA
          </h2>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card reveal"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="stars flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#FFD600" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-[#111111]">— {testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden mb-12">
            <div className="testimonial-card reveal">
              <div className="stars flex gap-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFD600" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
              <div>
                <p className="font-bold text-[#111111]">— {testimonials[currentTestimonial].author}</p>
                <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentTestimonial === index ? 'bg-[#25D366]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center reveal">
            <a
              href="https://pay.kiwify.com.br/myRjIBO"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              QUERO RESULTADOS IGUAIS
            </a>
          </div>
        </div>
      </section>

      {/* FAQ (ACORDION) */}
      <section className="py-16 lg:py-24 bg-[#F5F5F5]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] text-center mb-12 reveal">
            DÚVIDAS FREQUENTES
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item bg-white rounded-xl overflow-hidden reveal">
                <button
                  onClick={() => toggleFaq(index)}
                  className="faq-question w-full px-6 text-left flex items-center justify-between py-4"
                >
                  <span className="flex items-center gap-3 pr-4">
                    <HelpCircle size={20} className="text-[#25D366] flex-shrink-0" />
                    <span className="font-semibold text-[#111111]">{faq.question}</span>
                  </span>
                  <div className="flex-shrink-0">
                    {openFaq === index ? (
                      <Minus size={20} className="text-[#25D366]" />
                    ) : (
                      <Plus size={20} className="text-gray-400" />
                    )}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 pl-11 pr-6">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA (FINAL) */}
      <section className="py-16 lg:py-24 bg-[#111111]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-6 reveal">
            A ÚLTIMA DECISÃO QUE VOCÊ PRECISA TOMAR SOBRE DINHEIRO
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 reveal">
            Daqui a 30 dias, você pode estar no controle ou na mesma situação de sempre.
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-4 mb-8 reveal">
            <div className="bg-[#25D366] rounded-lg p-4 min-w-[80px]">
              <p className="text-3xl sm:text-4xl font-black text-white counter">
                {String(timeLeft.minutes).padStart(2, '0')}
              </p>
              <p className="text-white/80 text-sm">min</p>
            </div>
            <div className="bg-[#25D366] rounded-lg p-4 min-w-[80px]">
              <p className="text-3xl sm:text-4xl font-black text-white counter">
                {String(timeLeft.seconds).padStart(2, '0')}
              </p>
              <p className="text-white/80 text-sm">seg</p>
            </div>
          </div>
          <p className="text-gray-500 mb-8 reveal">Oferta válida por mais {timeLeft.minutes}:{String(timeLeft.seconds).padStart(2, '0')}</p>

          <div className="reveal">
            <a
              href="https://pay.kiwify.com.br/myRjIBO"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xl py-5 px-10 inline-flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              QUERO ORGANIZAR MINHAS FINANÇAS AGORA
              <ArrowRight size={24} />
            </a>
          </div>

          <p className="text-gray-600 text-sm mt-6 reveal">
            Preços podem aumentar a qualquer momento
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="/finbot-logo.png" 
                alt="FinBot" 
                className="w-12 h-12 object-contain"
              />
              <span className="font-bold text-2xl text-white">FinBot</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Termos de uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Política de privacidade
              </a>
              <a 
                href="http://wa.me/5548998025201" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                <MessageCircle size={14} className="text-[#25D366]" />
                Falar com suporte
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-4 mb-6">
              <a 
                href="http://wa.me/5548998025201"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#128C7E] transition-colors"
              >
                <Smartphone size={20} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-600 text-sm text-center">
              © 2024 FinBot. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
