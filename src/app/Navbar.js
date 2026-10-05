export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Логотип / имя */}
        <a href="#" className="text-lg font-bold text-white hover:text-blue-400 transition-colors">
          Кирилл Мирончук
        </a>

        {/* Навигация — десктоп */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
            Обо мне
          </a>
          <a href="#services" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
            Услуги
          </a>
          <a href="#experience" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
            Опыт
          </a>
          <a href="#projects" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
            Проекты
          </a>
          <a href="#education" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
            Образование
          </a>
        </div>

        {/* Кнопка "Связаться" */}
        <a
          href="#contact"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold text-white transition-colors"
        >
          Связаться
        </a>

      </div>
    </nav>
  );
}
