"use client";
import { useState } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";
import AnimatedCounter from "./AnimatedCounter";
import MagneticButton from "./MagneticButton";
import TiltCard from "./TiltCard";
import { FaTelegramPlane, FaGithub, FaEnvelope, FaGraduationCap, FaLaptopCode, FaMicrophone, FaChartBar, FaBook, FaPython, FaBriefcase, FaCity, FaBullseye, FaComments, FaCog, FaBrain, FaRocket, FaBolt, FaClipboardList, FaWater } from "react-icons/fa";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "Проектное управление",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");

  try {
    const response = await fetch("https://formspree.io/f/moejjejp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        contact: formData.contact,
        service: formData.service,
        message: formData.message,
      }),
    });

    if (response.ok) {
      setStatus("success");
      setFormData({
        name: "",
        contact: "",
        service: "Проектное управление",
        message: "",
      });
    } else {
      setStatus("error");
    }
  } catch (error) {
    setStatus("error");
  }
};

  return (
    <div className="min-h-screen text-white relative">
                        {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-4xl w-full text-center relative z-10">
          
          {/* Фото */}
          <FadeIn delay={0}>
            <div className="mb-8 flex justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl shadow-blue-500/50 glow-blue">
                <Image
                  src="/photo.jpg"
                  alt="Кирилл Мирончук"
                  fill
                  sizes="160px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </FadeIn>

          {/* Имя */}
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
              Кирилл Мирончук
            </h1>
          </FadeIn>

          {/* Подзаголовок */}
          <FadeIn delay={0.4}>
  <p className="text-xl md:text-2xl text-slate-300 mb-2">
    Менеджер проектов | Коуч | Мотиватор
  </p>
</FadeIn>

<FadeIn delay={0.5}>
  <div className="flex items-center justify-center gap-3 mb-4">
    <span className="relative flex h-3 w-3">
      {/* Пульсирующее кольцо */}
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      {/* Точка */}
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
    </span>
    <p className="text-sm md:text-base text-green-400 font-semibold">
      Открыт к junior-позициям и стажировкам
    </p>
  </div>
</FadeIn>

          {/* Краткое описание */}
          <FadeIn delay={0.6}>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              4+ года в клиентском менеджменте. Координация федеральных проектов.
              Магистратура по управлению AI-проектами. Помогаю людям и компаниям достигать целей.
            </p>
          </FadeIn>

          {/* Кнопки */}
          <FadeIn delay={0.8}>
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton
  href="#services"
  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
>
  <FaRocket />
  Услуги
</MagneticButton>
<MagneticButton
  href="#contact"
  className="inline-flex items-center gap-2 px-8 py-3 glass rounded-lg font-semibold text-white"
>
  <FaComments />
  Связаться
</MagneticButton>
<MagneticButton
  href="https://t.me/kirill_icetea"
  className="inline-flex items-center gap-2 px-8 py-3 glass rounded-lg font-semibold text-white"
>
  <FaTelegramPlane />
  Telegram
</MagneticButton>
            </div>
          </FadeIn>

        </div>
      </section>
                              {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Обо мне
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              Мой путь — от клиентского менеджмента к проектному управлению в IT
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Левая колонка — история */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn delay={0.3}>
                <div className="glass rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl text-blue-400">
                      <FaBriefcase />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        4 года в «Синергии»
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        Прошёл путь от менеджера по продажам до старшего аккаунт-менеджера.
                        Сейчас развиваю операционный отдел с нуля — выстраиваю процессы,
                        автоматизирую отчётность, координирую взаимодействие между подразделениями.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="glass rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl text-blue-400">
                      <FaCity />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Координация федеральных проектов
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        Координировал <span className="text-blue-400 font-semibold">4 федеральных мероприятия</span> в сфере
                        ЖКХ: всероссийские практикумы, семинары, вебинары и съезды.
                        Работал с министерствами, ФАС, ведущими ВУЗами и экспертами отрасли.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="glass rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl text-blue-400">
                      <FaGraduationCap />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Учусь и развиваюсь
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        Параллельно учусь в магистратуре на «Менеджмент проектов в сфере
                        искусственного интеллекта» и прошёл курс «Python-разработчик»
                        в Яндекс.Практикум — чтобы говорить с разработчиками на одном языке.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="glass rounded-2xl p-8 border-l-4 border-blue-500">
                  <p className="text-slate-400 italic leading-relaxed">
                    «Я не называю себя проектным менеджером — пока. Но я уже управлял
                    проектами, процессами и людьми. И хочу делать это в ИТ.»
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Правая колонка — статистика */}
            <div className="space-y-4">
              <FadeIn delay={0.3}>
                <div className="glass rounded-2xl p-6 text-center hover:border-blue-500 transition-all">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    <AnimatedCounter to={4} suffix="+" />
                  </div>
                  <div className="text-sm text-slate-400">года в клиентском менеджменте</div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <div className="glass rounded-2xl p-6 text-center hover:border-blue-500 transition-all">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    <AnimatedCounter to={4} />
                  </div>
                  <div className="text-sm text-slate-400">федеральных мероприятия</div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="glass rounded-2xl p-6 text-center hover:border-blue-500 transition-all">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    <AnimatedCounter to={440} />
                  </div>
                  <div className="text-sm text-slate-400">часов Python-курса</div>
                </div>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="glass rounded-2xl p-6 text-center hover:border-blue-500 transition-all">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    <AnimatedCounter to={2025} duration={2.5} />
                  </div>
                  <div className="text-sm text-slate-400">магистратура по AI-проектам</div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
                                    {/* SKILLS */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Что я уже умею
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              Сочетаю клиентский опыт, управление проектами и техническую базу
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Управление проектами */}
            <FadeIn delay={0.3} className="md:col-span-2">
              <div className="glass rounded-2xl p-8 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-5xl mb-4 text-blue-400">
                    <FaChartBar />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Управление проектами</h3>
                  <p className="text-slate-400 leading-relaxed max-w-lg">
                    Agile / Scrum (база), ведение трекеров, декомпозиция задач,
                    контроль сроков и качества. Применяю в текущих проектах.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Клиентский менеджмент */}
            <FadeIn delay={0.4}>
              <div className="glass rounded-2xl p-8 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-4xl mb-4 text-blue-400">
                    <FaComments />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Клиентский менеджмент</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Переговоры, КП, презентации, полный цикл документооборота, программы лояльности.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Операционное управление */}
            <FadeIn delay={0.5}>
              <div className="glass rounded-2xl p-8 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-4xl mb-4 text-blue-400">
                    <FaCog />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Операционное управление</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Построение процессов с нуля, автоматизация отчётности, регламенты, координация отделов.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Event-менеджмент */}
            <FadeIn delay={0.6}>
              <div className="glass rounded-2xl p-8 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-4xl mb-4 text-blue-400">
                    <FaBullseye />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Event-менеджмент</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Организация федеральных мероприятий, работа со спикерами, логистика, бюджет.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Техническая база */}
            <FadeIn delay={0.7} className="md:col-span-2">
              <div className="glass rounded-2xl p-8 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-5xl mb-4 text-blue-400">
                    <FaLaptopCode />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Техническая база</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Python", "SQL", "Docker", "CI/CD", "Linux", "Git", "Django", "API"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ИИ и данные */}
            <FadeIn delay={0.8} className="md:col-span-3">
              <div className="glass rounded-2xl p-8 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative flex items-start gap-6">
                  <div className="text-5xl text-blue-400">
                    <FaBrain />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">ИИ и данные</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Участие во внедрении GPT-3/4, понимание нейросетей, работа с ТЗ. Магистратура «Менеджмент проектов в сфере искусственного интеллекта».
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
                                    {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Услуги
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              Помогаю людям и компаниям — честно, с тем опытом, который у меня есть
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Главная услуга — Поддержка проектов (большая) */}
            <FadeIn delay={0.3} className="lg:col-span-2 lg:row-span-2">
              <div className="glass rounded-2xl p-8 h-full hover:border-blue-500 transition-all relative overflow-hidden group flex flex-col">
                <div className="relative flex-1 flex flex-col">
                  <div className="text-5xl mb-4 text-blue-400">
                    <FaChartBar />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Поддержка проектов</h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6 flex-1">
                    Помогаю проектным командам: веду документацию, координирую задачи,
                    контролирую сроки, готовлю отчёты. Работаю в Agile/Scrum,
                    понимаю техническую сторону (Python, SQL, Docker).
                  </p>
                  <p className="text-sm text-slate-400 mb-4">
                    <span className="text-blue-400 font-semibold">Для кого:</span> команды, стартапы, малый бизнес
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors group-hover:gap-3">
                    Обсудить задачи <span>→</span>
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Коучинг */}
            <FadeIn delay={0.4}>
              <div className="glass rounded-2xl p-6 hover:border-blue-500 transition-all relative overflow-hidden group h-full">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaBullseye />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Коучинг и наставничество</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                    Помогаю начинающим специалистам: цели, навыки, разбор кейсов, план роста.
                  </p>
                  <a href="#contact" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                    Записаться →
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Мотивация */}
            <FadeIn delay={0.5}>
              <div className="glass rounded-2xl p-6 hover:border-blue-500 transition-all relative overflow-hidden group h-full">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaMicrophone />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Мотивация и выступления</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                    Лекции, мастер-классы. Делюсь опытом: карьера, IT-переход, смена профессии.
                  </p>
                  <a href="#contact" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                    Пригласить →
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Клиентский сервис */}
            <FadeIn delay={0.6}>
              <div className="glass rounded-2xl p-6 hover:border-blue-500 transition-all relative overflow-hidden group h-full">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaComments />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Клиентский сервис</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                    Построение сервиса, работа с возражениями, удержание, документооборот.
                  </p>
                  <a href="#contact" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                    Заказать →
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Менторство */}
            <FadeIn delay={0.7}>
              <div className="glass rounded-2xl p-6 hover:border-blue-500 transition-all relative overflow-hidden group h-full">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaRocket />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Менторство в IT-переходе</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                    Помогаю перейти в IT / PM: разбор целей, план обучения, поддержка.
                  </p>
                  <a href="#contact" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                    Начать путь →
                  </a>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
                  {/* MY STRENGTHS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Мои сильные стороны
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              Честно — без прикрас. Что я уже умею и приношу команде
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <FadeIn delay={0.3}>
              <div className="glass rounded-2xl p-6 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaBolt />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Быстро включаюсь</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    За 4 года в «Синергии» привык разбираться в новых процессах с первой недели.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="glass rounded-2xl p-6 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaBullseye />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Довожу до конца</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Координировал 4 федеральных мероприятия. Ни один проект не сорвался по срокам.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="glass rounded-2xl p-6 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaBrain />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Понимаю техсторону</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Прошёл Python-курс (440 ч). Понимаю код, Docker, CI/CD — говорю с разработчиками на одном языке.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="glass rounded-2xl p-6 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaComments />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Клиентский опыт</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    4 года переговоров, работы с возражениями, документацией и ожиданиями.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              <div className="glass rounded-2xl p-6 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaBook />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Учусь параллельно</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Магистратура по AI-проектам + работа + курсы. Умею учиться, не бросая дело.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="glass rounded-2xl p-6 h-full hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative">
                  <div className="text-4xl mb-3 text-blue-400">
                    <FaRocket />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Мотивация</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Меняю профессию осознанно. Хочу расти в PM и делать это долго. Не «на год».
                  </p>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
                              {/* EXPERIENCE */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Опыт работы
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              4+ года в клиентском менеджменте и координации проектов
            </p>
          </FadeIn>

          <div className="space-y-8">
            
            {/* Работа 1 — ПРОШЛАЯ */}
            <FadeIn delay={0.3}>
              <div className="relative pl-8 border-l-2 border-blue-500/30 hover:border-blue-500/60 transition-colors">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500/50 shadow-lg shadow-blue-500/30"></div>
                
                <div className="glass rounded-2xl p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm font-semibold text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                      Июнь 2021 — Май 2022
                    </span>
                    <span className="text-sm text-slate-500">1 год</span>
                  </div>
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl text-blue-400">
                      <FaCity />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Менеджер 1 грейда, Event-менеджер
                      </h3>
                      <p className="text-lg text-slate-400">
                        Информационный портал управления ЖКХ
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span>Организация деловых мероприятий для руководителей компаний ЖКХ (водоснабжение, теплоснабжение)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span>Координация 4 федеральных мероприятий: всероссийские практикумы, семинары, вебинары, съезды</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span>Полный цикл: программа, спикеры, логистика, бюджет, работа с партнёрами</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span>Дважды повышение за первый месяц работы (с 3-го до 1-го грейда)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Работа 2 — ТЕКУЩАЯ */}
            <FadeIn delay={0.5}>
              <div className="relative pl-8 border-l-2 border-blue-500 hover:border-blue-400 transition-colors">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-pulse"></div>
                
                <div className="glass rounded-2xl p-6 md:p-8 border border-blue-500/30">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                      Июнь 2022 — настоящее время
                    </span>
                    <span className="text-sm text-slate-500">4+ года</span>
                  </div>
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl text-blue-400">
                      <FaGraduationCap />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Старший аккаунт-менеджер
                      </h3>
                      <p className="text-lg text-slate-400">
                        Московский финансово-промышленный университет «Синергия»
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span>Участие во внедрении ИТ-продуктов на базе GPT-3/4: координация команды разработчиков, контроль сроков, подготовка брифов</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span>Развитие операционного отдела с нуля: выстраивание процессов, регламентов, автоматизация отчётности</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span>Ведение ключевых клиентов: переговоры, КП, полный цикл документооборота</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span>Применение Agile / Scrum в текущих проектах</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
                                    {/* PROJECTS */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Проекты
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              Реальный опыт: федеральные мероприятия и учебные кейсы
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Проект 1 */}
            <FadeIn delay={0.3}>
              <TiltCard className="h-full">
                <div className="glass rounded-2xl p-6 md:p-8 hover:border-blue-500 transition-all relative overflow-hidden group h-full">
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl text-blue-400">
                        <FaCity />
                      </div>
                      <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                        2021
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      IV Всероссийский модульный практикум
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Калининград · 26–27 августа 2021
                    </p>
                    <p className="text-sm text-blue-400 font-semibold mb-3">
                      Роль: Координатор проекта
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Координация деловой программы (теория + практика)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Работа с экспертами и министерствами регионов</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-4">
                      <a href="https://upravlenie-gkh.ru/meropriyatiya/meropriyatie-detalno.php?ID=16969" target="_blank" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                        Страница мероприятия →
                      </a>
                      <a href="https://mtpkrskstate.ru/upload/iblock/938/g7puwhu4eh901bhape7pxxoa24dm52hh/Krasnoyarskiy-kray-REK.pdf" target="_blank" className="text-slate-400 hover:text-slate-300 text-sm font-semibold">
                        Письмо →
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>

            {/* Проект 2 */}
            <FadeIn delay={0.4}>
              <TiltCard className="h-full">
                <div className="glass rounded-2xl p-6 md:p-8 hover:border-blue-500 transition-all relative overflow-hidden group h-full">
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl text-blue-400">
                        <FaLaptopCode />
                      </div>
                      <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                        2021
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Всероссийский вебинар «ЖКУ в МКД-новостройках»
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Онлайн · 17 сентября 2021
                    </p>
                    <p className="text-sm text-blue-400 font-semibold mb-3">
                      Роль: Координатор проекта
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Организация вебинара и работа со спикером</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Коммуникация с ГЖИ Воронежской области</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-4">
                      <a href="https://upravlenie-gkh.ru/meropriyatiya/meropriyatie-detalno.php?ID=17784" target="_blank" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                        Страница мероприятия →
                      </a>
                      <a href="https://gzhi.govvrn.ru/storage/2023/02/01/voronezskaia.pdf" target="_blank" className="text-slate-400 hover:text-slate-300 text-sm font-semibold">
                        Письмо →
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>

            {/* Проект 3 */}
            <FadeIn delay={0.5}>
              <TiltCard className="h-full">
                <div className="glass rounded-2xl p-6 md:p-8 hover:border-blue-500 transition-all relative overflow-hidden group h-full">
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl text-blue-400">
                        <FaClipboardList />
                      </div>
                      <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                        2022
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      II Всероссийский практический семинар
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Москва · 31 марта — 1 апреля 2022
                    </p>
                    <p className="text-sm text-blue-400 font-semibold mb-3">
                      Роль: Координатор проекта
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Координация программы (10+ тем по тарифному регулированию)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Повышение квалификации от ведущих ВУЗов</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-4">
                      <a href="https://upravlenie-gkh.ru/meropriyatiya/meropriyatie-detalno.php?ID=19199" target="_blank" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                        Страница мероприятия →
                      </a>
                      <a href="https://vk.ru/wall-181018671_61" target="_blank" className="text-slate-400 hover:text-slate-300 text-sm font-semibold">
                        Письмо →
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>

            {/* Проект 4 */}
            <FadeIn delay={0.6}>
              <TiltCard className="h-full">
                <div className="glass rounded-2xl p-6 md:p-8 hover:border-blue-500 transition-all relative overflow-hidden group h-full">
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl text-blue-400">
                        <FaWater />
                      </div>
                      <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                        2022
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      V Общероссийский летний съезд
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Сочи · 8–10 июня 2022
                    </p>
                    <p className="text-sm text-blue-400 font-semibold mb-3">
                      Роль: Координатор проекта
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Координация 3 форматов: теория, открытый микрофон, бизнес-игра</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Работа с ФАС, ВУЗами и экспертами отрасли</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-4">
                      <a href="https://upravlenie-gkh.ru/meropriyatiya/meropriyatie-detalno.php?ID=19368" target="_blank" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                        Страница мероприятия →
                      </a>
                      <a href="https://tarif.gov39.ru/files/2022/Съезд_1-объединены.pdf" target="_blank" className="text-slate-400 hover:text-slate-300 text-sm font-semibold">
                        Программа →
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>

            {/* Проект 5 — ВКР */}
            <FadeIn delay={0.7} className="md:col-span-2">
              <TiltCard className="h-full">
                <div className="glass rounded-2xl p-6 md:p-8 hover:border-blue-500 transition-all relative overflow-hidden group">
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl text-blue-400">
                        <FaGraduationCap />
                      </div>
                      <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                        2025
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      ВКР: «Разработка рекламной кампании для Rutube»
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Выпускная квалификационная работа · Бакалавриат «Интернет-маркетинг», Синергия
                    </p>
                    <p className="text-sm text-blue-400 font-semibold mb-4">
                      Роль: Автор исследования
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Анализ рынка видеохостингов (Rutube, YouTube, VK Video)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Анкетирование 50+ респондентов, выявление проблем платформы</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>Разработка рекламной кампании с бюджетом 20 млн руб., оценка ROI 1100%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>

          </div>
        </div>
      </section>
                              {/* EDUCATION */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Образование
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              Академическая база и профессиональная переподготовка
            </p>
          </FadeIn>

          <div className="space-y-4">
            
            {/* Бакалавриат */}
            <FadeIn delay={0.3}>
              <div className="glass rounded-2xl p-6 hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl text-blue-400">
                      <FaGraduationCap />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Бакалавриат «Реклама и связи с общественностью»
                      </h3>
                      <p className="text-sm text-slate-400">
                        Московский финансово-промышленный университет «Синергия»
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Профиль: Интернет-маркетинг. ВКР: разработка рекламной кампании для Rutube
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                    2020–2025
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Python-разработчик */}
            <FadeIn delay={0.4}>
              <div className="glass rounded-2xl p-6 border border-blue-500/40 hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl text-blue-400">
                      <FaLaptopCode />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Профессиональная переподготовка «Python-разработчик»
                      </h3>
                      <p className="text-sm text-slate-400">
                        Яндекс.Практикум · 440 часов · квалификация «Программист»
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Модули: Python, SQL, ООП, Git, Django, API, алгоритмы, инфраструктура бэкенда
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                    2022–2024
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* YACOE 2023 */}
            <FadeIn delay={0.5}>
              <div className="glass rounded-2xl p-6 hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl text-blue-400">
                      <FaMicrophone />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Конференция Яндекса YACOE 2023
                      </h3>
                      <p className="text-sm text-slate-400">
                        Сертификат участника · Yet another Conference on Education
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                    2023
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Project manager */}
            <FadeIn delay={0.6}>
              <div className="glass rounded-2xl p-6 hover:border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl text-blue-400">
                      <FaChartBar />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Повышение квалификации «Project manager»
                      </h3>
                      <p className="text-sm text-slate-400">
                        Московский финансово-промышленный университет «Синергия»
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                    2025
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Магистратура — текущая */}
            <FadeIn delay={0.7}>
              <div className="glass rounded-2xl p-6 border-2 border-blue-500 transition-all relative overflow-hidden group">
                <div className="relative flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl text-blue-400">
                      <FaGraduationCap />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Магистратура «Менеджмент проектов в сфере ИИ»
                      </h3>
                      <p className="text-sm text-slate-400">
                        Московский финансово-промышленный университет «Синергия»
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full whitespace-nowrap animate-pulse">
                    2025 — н.в.
                  </span>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
                              {/* CERTIFICATES */}
      <section id="certificates" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Сертификаты и дипломы
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              Кликните на карточку, чтобы открыть документ
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Диплом бакалавра */}
            <FadeIn delay={0.3}>
              <a
                href="/certificates/bachelor-diploma.pdf"
                target="_blank"
                className="glass rounded-2xl p-6 text-center hover:border-blue-500 transition-all relative overflow-hidden group block h-full"
              >
                <div className="relative">
                  <div className="text-5xl mb-4 text-blue-400 group-hover:scale-110 transition-transform flex justify-center">
                    <FaGraduationCap />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Диплом бакалавра
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Реклама и PR · Синергия
                  </p>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    2025
                  </span>
                </div>
              </a>
            </FadeIn>

            {/* Python-разработчик */}
            <FadeIn delay={0.4}>
              <a
                href="/certificates/python-diploma.pdf"
                target="_blank"
                className="glass rounded-2xl p-6 text-center hover:border-blue-500 transition-all relative overflow-hidden group block h-full"
              >
                <div className="relative">
                  <div className="text-5xl mb-4 text-blue-400 group-hover:scale-110 transition-transform flex justify-center">
                    <FaPython />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Python-разработчик
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Яндекс.Практикум · 440 часов
                  </p>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    2024
                  </span>
                </div>
              </a>
            </FadeIn>

            {/* YACOE 2023 */}
            <FadeIn delay={0.5}>
              <a
                href="/certificates/yacoe-2023.pdf"
                target="_blank"
                className="glass rounded-2xl p-6 text-center hover:border-blue-500 transition-all relative overflow-hidden group block h-full"
              >
                <div className="relative">
                  <div className="text-5xl mb-4 text-blue-400 group-hover:scale-110 transition-transform flex justify-center">
                    <FaMicrophone />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    YACOE 2023
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Конференция Яндекса
                  </p>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    2023
                  </span>
                </div>
              </a>
            </FadeIn>

            {/* Project manager */}
            <FadeIn delay={0.6}>
              <a
                href="/certificates/project-manager.pdf"
                target="_blank"
                className="glass rounded-2xl p-6 text-center hover:border-blue-500 transition-all relative overflow-hidden group block h-full"
              >
                <div className="relative">
                  <div className="text-5xl mb-4 text-blue-400 group-hover:scale-110 transition-transform flex justify-center">
                    <FaChartBar />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Project manager
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Синергия
                  </p>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    2025
                  </span>
                </div>
              </a>
            </FadeIn>

          </div>
        </div>
      </section>
            {/* OPEN TO */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="glass rounded-2xl p-8 md:p-10 border border-blue-500/30 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl text-blue-400">
                    <FaBullseye />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Открыт к предложениям
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl text-blue-400">
                      <FaBriefcase />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Junior PM</p>
                      <p className="text-sm text-slate-400">Полная занятость, Москва / удалёнка</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-2xl text-blue-400">
                      <FaGraduationCap />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Стажировка</p>
                      <p className="text-sm text-slate-400">В проектном управлении / IT</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-2xl text-blue-400">
                      <FaBolt />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Part-time</p>
                      <p className="text-sm text-slate-400">Координация проектов, поддержка команд</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
                        {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Связаться со мной
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              Обсудим ваш проект, задачу или идею — отвечу в течение 24 часов
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Левая колонка — прямые контакты */}
            <FadeIn delay={0.3}>
              <div className="space-y-4 h-full">
                <h3 className="text-xl font-bold text-white mb-6">Прямые контакты</h3>

                {/* Telegram с QR */}
                <a
  href="https://t.me/kirill_icetea"
  target="_blank"
  className="glass rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500 transition-all group"
>
  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white p-1 transition-all duration-300 group-hover:w-32 group-hover:h-32 group-hover:scale-110 group-hover:z-10 group-hover:shadow-2xl group-hover:shadow-blue-500/50 relative">
    <Image
      src="/qr/qr-telegram.png"
      alt="QR Telegram"
      width={128}
      height={128}
      className="w-full h-full object-contain"
    />
  </div>
  <div className="flex-shrink-0">
    <FaTelegramPlane className="text-3xl text-blue-400" />
  </div>
  <div className="flex-1">
    <p className="text-sm text-slate-400">Telegram (быстрее всего)</p>
    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">
      @kirill_icetea
    </p>
  </div>
</a>

                <a
  href="https://max.ru/+79959962239"
  target="_blank"
  className="glass rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500 transition-all group"
>
  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white p-1 transition-all duration-300 group-hover:w-32 group-hover:h-32 group-hover:scale-110 group-hover:z-10 group-hover:shadow-2xl group-hover:shadow-blue-500/50 relative">
    <Image
      src="/qr/qr-max.png"
      alt="QR MAX"
      width={128}
      height={128}
      className="w-full h-full object-contain"
    />
  </div>
  <div className="flex-shrink-0">
    <span className="text-3xl text-blue-400 font-bold">M</span>
  </div>
  <div className="flex-1">
    <p className="text-sm text-slate-400">MAX</p>
    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">
      +7 (995) 996-22-39
    </p>
  </div>
</a>

                {/* Email */}
                <a
                  href="mailto:kirilltesis@yandex.ru"
                  className="glass rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500 transition-all group"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-4xl text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                      kirilltesis@yandex.ru
                    </p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/kirillicetea"
                  target="_blank"
                  className="glass rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500 transition-all group"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center">
                    <FaGithub className="text-4xl text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400">GitHub</p>
                    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                      github.com/kirillicetea
                    </p>
                  </div>
                </a>

              </div>
            </FadeIn>

            {/* Правая колонка — форма */}
            <FadeIn delay={0.4}>
              <div className="glass rounded-2xl p-8 h-full">
                <h3 className="text-xl font-bold text-white mb-6">Оставить заявку</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Как к вам обращаться?"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Email или Telegram *</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      placeholder="Для связи"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Что вас интересует?</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option>Проектное управление</option>
                      <option>Коучинг и наставничество</option>
                      <option>Мотивация и выступления</option>
                      <option>Клиентский сервис</option>
                      <option>Менторство в IT-переходе</option>
                      <option>Другое</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Сообщение *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder="Расскажите о задаче..."
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-white transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Отправляю..." : "Отправить заявку"}
                  </button>

                  {status === "success" && (
                    <p className="text-sm text-green-400 text-center">
                      ✅ Заявка отправлена! Отвечу в течение 24 часов.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-400 text-center">
                      ❌ Ошибка отправки. Напишите в Telegram: @kirill_icetea
                    </p>
                  )}
                </form>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
            {/* FOOTER */}
      <footer className="py-12 px-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            {/* Колонка 1 — имя */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Кирилл Мирончук
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Проектный менеджер | Коуч | Мотиватор
              </p>
              <p className="text-xs text-slate-500">
                Помогаю людям и компаниям достигать целей
              </p>
            </div>

            {/* Колонка 2 — навигация */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Навигация
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    Обо мне
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    Услуги
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    Проекты
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    Связаться
                  </a>
                </li>
              </ul>
            </div>

            {/* Колонка 3 — контакты */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Контакты
              </h4>
              <ul className="space-y-2">
  <li>
    <a
      href="https://t.me/kirill_icetea"
      target="_blank"
      className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
    >
      <FaTelegramPlane className="text-blue-400" />
      Telegram
    </a>
  </li>
  <li>
    <a
      href="mailto:kirilltesis@yandex.ru"
      className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
    >
      <FaEnvelope className="text-blue-400" />
      kirilltesis@yandex.ru
    </a>
  </li>
  <li>
    <a
      href="https://github.com/kirillicetea"
      target="_blank"
      className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
    >
      <FaGithub className="text-blue-400" />
      GitHub
    </a>
  </li>
</ul>
            </div>

          </div>

          {/* Нижняя полоса */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2026 Кирилл Мирончук. Все права защищены.
            </p>
            <p className="text-sm text-slate-500">
  Сделано с <span className="text-red-400">❤</span> на Next.js
</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
