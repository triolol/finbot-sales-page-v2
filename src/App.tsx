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

  const CHECKOUT_URL = "https://pay.kiwify.com.br/HOmpECy";

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
                { label: 'Acesso', id: 'planos' },
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
                href={CHECKOUT_URL}
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
            { label: 'Acesso', id: 'planos' },
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
            href={CHECKOUT_URL}
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
                  href={CHECKOUT_URL}
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
                  <Star size={18} className="text-[#FFD600]" />
                  <span>4.9/5 estrelas</span>
                </div>
              </div>
            </div>

            {/* Mockup */}
            <div className="relative animate-fade-in-right">
              <div className="absolute -inset-4 bg-[#25D366]/20 blur-3xl rounded-full" />
              <div className="relative bg-[#111111] rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-800 max-w-[320px] mx-auto">
                <div className="bg-[#075E54] rounded-[2rem] overflow-hidden">
                  {/* WhatsApp Header */}
                  <div className="bg-[#128C7E] p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <img src="/finbot-logo.png" alt="FinBot" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">FinBot</p>
                      <p className="text-white/70 text-[10px]">online</p>
                    </div>
                  </div>
                  
                  {/* WhatsApp Body */}
                  <div className="p-4 space-y-4 h-[400px] bg-[#E5DDD5] overflow-y-auto custom-scrollbar">
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
                      <p className="text-xs text-[#111111]">Olá! Como posso ajudar hoje?</p>
                    </div>
                    <div className="bg-[#DCF8C6] rounded-lg p-3 shadow-sm max-w-[85%] ml-auto">
                      <p className="text-xs text-[#111111]">Almoço 45</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
                      <p className="text-xs text-[#111111]">
                        <span className="text-green-600 font-bold">✓</span> Registrado!<br/>
                        <span className="text-lg">🧾</span> Almoço: R$45,00<br/>
                        <span className="text-lg">📊</span> Saldo: R$1.955,00
                      </p>
                    </div>
                    <div className="bg-[#DCF8C6] rounded-lg p-3 shadow-sm max-w-[85%] ml-auto">
                      <p className="text-xs text-[#111111]">Relatório</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
                      <p className="text-xs text-[#111111]">
                        <span className="text-lg">📊</span> **Resumo Semanal**<br/>
                        Alimentação: R$320,00<br/>
                        Transporte: R$150,00<br/>
                        Lazer: R$200,00<br/>
                        ---<br/>
                        **Total: R$670,00**
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#25D366]">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Economia este mês</p>
                    <p className="text-lg font-black text-[#111111]">R$ 450,00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA (PREÇO ÚNICO) */}
      <section id="planos" className="py-16 lg:py-24 green-gradient" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
              ACESSO VITALÍCIO AO FINBOT
            </h2>
            <p className="text-white/80 text-lg">
              Pagamento único. Sem mensalidades. Sem taxas escondidas.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-6 lg:p-10 reveal relative shadow-2xl border-4 border-[#FFD600]">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FFD600] text-[#111111] text-xs font-black px-6 py-2 rounded-full badge-pulse">
                  OFERTA POR TEMPO LIMITADO
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#111111] mb-4">ACESSO COMPLETO</h3>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-gray-400 line-through text-xl">R$ 197,00</span>
                  <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded">65% OFF</span>
                </div>
                <div className="mb-2">
                  <span className="text-6xl font-black text-[#111111]">R$ 67</span>
                  <span className="text-2xl font-bold text-[#111111]">,00</span>
                </div>
                <p className="text-gray-500 font-medium">Pagamento Único</p>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  "Acesso vitalício ao FinBot",
                  "Relatórios automáticos ilimitados",
                  "Categorização inteligente de gastos",
                  "Suporte prioritário via WhatsApp",
                  "Atualizações gratuitas para sempre",
                  "Segurança e criptografia de dados"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="bg-green-100 rounded-full p-1">
                      <Check size={18} className="text-[#25D366]" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full block text-center text-xl py-5 shadow-xl hover:scale-105 transition-transform"
                style={{ backgroundColor: '#25D366' }}
              >
                QUERO MEU ACESSO AGORA
              </a>
              
              <div className="mt-6 flex items-center justify-center gap-4 text-gray-400 text-xs">
                <div className="flex items-center gap-1">
                  <Shield size={14} />
                  <span>Compra 100% Segura</span>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard size={14} />
                  <span>Acesso Imediato</span>
                </div>
              </div>
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
                desc: "Faça o pagamento único e seguro de R$ 67,00"
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
              href={CHECKOUT_URL}
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
              href={CHECKOUT_URL}
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
              href={CHECKOUT_URL}
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
          <div className="hidden md:grid grid-cols-3 gap-8 mb-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#F5F5F5] p-8 rounded-2xl reveal" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#FFD600] text-[#FFD600]" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                <div>
                  <p className="font-bold text-[#111111]">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative mb-12">
            <div className="bg-[#F5F5F5] p-8 rounded-2xl min-h-[250px] flex flex-col justify-center">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#FFD600] text-[#FFD600]" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"{testimonials[currentTestimonial].text}"</p>
              <div>
                <p className="font-bold text-[#111111]">{testimonials[currentTestimonial].author}</p>
                <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentTestimonial === i ? 'w-6 bg-[#25D366]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center reveal">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              QUERO TER ESSES RESULTADOS
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-[#F5F5F5]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] text-center mb-12 reveal">
            DÚVIDAS FREQUENTES
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4"
                >
                  <span className="font-bold text-[#111111]">{faq.question}</span>
                  {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                <div className={`transition-all duration-300 ease-in-out ${
                  openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-6 pt-0 text-gray-600 border-t border-gray-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 lg:py-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#25D366] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 reveal">
            PRONTO PARA MUDAR SUA VIDA FINANCEIRA?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto reveal">
            Junte-se a centenas de pessoas que já organizaram suas finanças com o FinBot. 
            Acesso vitalício por apenas R$ 67,00.
          </p>
          <div className="reveal">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xl py-5 px-12 inline-flex items-center gap-3"
            >
              QUERO MEU ACESSO AGORA
              <ArrowRight size={24} />
            </a>
          </div>
          <p className="mt-6 text-gray-500 text-sm reveal">
            Garantia de satisfação ou seu dinheiro de volta em até 7 dias.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="/finbot-logo.png" alt="FinBot" className="w-8 h-8 object-contain" />
                <span className="font-bold text-xl text-white">FinBot</span>
              </div>
              <p className="text-gray-500 max-w-sm">
                O assistente financeiro mais simples do mundo, direto no seu WhatsApp. 
                Transformando a forma como você lida com seu dinheiro.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection('como-funciona')} className="text-gray-500 hover:text-white transition-colors">Como Funciona</button></li>
                <li><button onClick={() => scrollToSection('beneficios')} className="text-gray-500 hover:text-white transition-colors">Benefícios</button></li>
                <li><button onClick={() => scrollToSection('planos')} className="text-gray-500 hover:text-white transition-colors">Acesso</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Suporte</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="http://wa.me/5548998025201" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a 
                    href="http://wa.me/5548998025201" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-sm">
              © 2024 FinBot. Todos os direitos reservados.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-600 hover:text-white transition-colors text-xs">Termos de Uso</a>
              <a href="#" className="text-gray-600 hover:text-white transition-colors text-xs">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
