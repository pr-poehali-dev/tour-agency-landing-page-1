import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const heroImg = 'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/f2a257ab-31d3-45d0-9930-cc2f75f15328.jpg';
const antalyaImg = 'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/045c3e28-3806-40bc-91bf-3c7d21074192.jpg';
const dubaiImg = 'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/d81faa06-979e-47b3-97f8-8c2ada889aa8.jpg';

const hotTours = [
  { country: 'Турция', city: 'Анталия', nights: '7 ночей', price: '56 000 ₽', note: 'за двоих · вылет завтра', img: antalyaImg, badge: 'Горящий' },
  { country: 'Египет', city: 'Хургада', nights: '5 ночей', price: '49 000 ₽', note: 'вылет через 3 дня', img: heroImg, badge: 'Выгодно' },
  { country: 'ОАЭ', city: 'Дубай', nights: '7 ночей', price: '89 000 ₽', note: 'горящая путёвка', img: dubaiImg, badge: 'Хит' },
];

const summerPlans = [
  { title: 'Сочи + Абхазия', desc: 'Автобусный тур вдоль побережья', icon: 'Bus', color: 'bg-brand-orange' },
  { title: 'Мальдивы', desc: 'Раннее бронирование со скидкой', icon: 'Palmtree', color: 'bg-brand-blue' },
  { title: 'Алтай', desc: 'Пешие походы с гидом', icon: 'Mountain', color: 'bg-brand-orange' },
];

const funTrips = [
  { title: 'Стамбул', desc: 'Шопинг и вкусная еда', icon: 'ShoppingBag' },
  { title: 'Паттайя', desc: 'Тусовки до утра', icon: 'PartyPopper' },
  { title: 'Бали', desc: 'Сёрфинг и йога', icon: 'Waves' },
];

const priceMap = [
  { country: 'Турция', price: 'от 40 000 ₽' },
  { country: 'Египет', price: 'от 50 000 ₽' },
  { country: 'Таиланд', price: 'от 80 000 ₽' },
  { country: 'Мальдивы', price: 'от 120 000 ₽' },
  { country: 'ОАЭ', price: 'от 70 000 ₽' },
];

const directions = [
  { name: 'Европа', icon: 'Landmark' },
  { name: 'Азия', icon: 'TreePalm' },
  { name: 'Россия', icon: 'MapPin' },
  { name: 'Ближний Восток', icon: 'Building2' },
  { name: 'Острова', icon: 'Palmtree' },
  { name: 'Африка', icon: 'Sun' },
  { name: 'Круизы', icon: 'Ship' },
  { name: 'Экскурсии', icon: 'Camera' },
  { name: 'Лечение', icon: 'HeartPulse' },
];

const seasonOffers = {
  summer: ['Греция, острова — от 55 000 ₽', 'Турция, Кемер — от 42 000 ₽', 'Сочи, лето — от 28 000 ₽'],
  winter: ['ОАЭ, Дубай — от 70 000 ₽', 'Таиланд, Пхукет — от 85 000 ₽', 'Мальдивы — от 120 000 ₽'],
};

const Index = () => {
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState<Date | undefined>();
  const [season, setSeason] = useState<'summer' | 'winter'>('summer');
  const [activeDir, setActiveDir] = useState<string | null>(null);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-brand-orange flex items-center justify-center shadow-soft">
              <Icon name="Plane" className="text-white" size={22} />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight">Тур Стори</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <button onClick={() => scrollTo('tours')} className="hover:text-brand-orange transition-colors">Туры</button>
            <button onClick={() => scrollTo('about')} className="hover:text-brand-orange transition-colors">О нас</button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-brand-orange transition-colors">Отзывы</button>
            <button onClick={() => scrollTo('contacts')} className="hover:text-brand-orange transition-colors">Контакты</button>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+78001234567" className="hidden lg:block font-display font-bold text-brand-orange">+7 800 123-45-67</a>
            <Button className="rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold gap-2">
              <Icon name="MessageCircle" size={18} />
              <span className="hidden sm:inline">Мессенджеры</span>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO + SEARCH */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Путешествия" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-background" />
        </div>
        <div className="relative container pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="font-display font-black text-4xl md:text-6xl text-white leading-tight drop-shadow-lg">
              Найди свой идеальный отдых
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-lg drop-shadow">
              Горящие туры, раннее бронирование и лучшие цены на путешествия по всему миру.
            </p>
          </div>

          {/* SEARCH CARD */}
          <div className="mt-8 bg-card rounded-3xl shadow-card p-5 md:p-7 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <Field label="Откуда" icon="PlaneTakeoff">
                <Input placeholder="Аэропорт / город" className="rounded-xl border-border bg-background h-11" />
              </Field>
              <Field label="Куда" icon="MapPin">
                <Input placeholder="Страна или курорт" className="rounded-xl border-border bg-background h-11" />
              </Field>
              <Field label="Когда" icon="CalendarDays">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full h-11 rounded-xl border border-border bg-background px-3 text-left text-sm flex items-center justify-between hover:border-brand-orange transition-colors">
                      <span className={date ? '' : 'text-muted-foreground'}>
                        {date ? date.toLocaleDateString('ru-RU') : 'Выберите дату'}
                      </span>
                      <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field label="Человек" icon="Users">
                <div className="h-11 rounded-xl border border-border bg-background flex items-center justify-between px-2">
                  <button onClick={() => setPeople((p) => Math.max(1, p - 1))} className="w-7 h-7 rounded-lg bg-muted hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center">
                    <Icon name="Minus" size={16} />
                  </button>
                  <span className="font-semibold">{people}</span>
                  <button onClick={() => setPeople((p) => Math.min(10, p + 1))} className="w-7 h-7 rounded-lg bg-muted hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center">
                    <Icon name="Plus" size={16} />
                  </button>
                </div>
              </Field>
              <Button className="h-11 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-base gap-2 shadow-soft">
                <Icon name="Search" size={18} /> Найти туры
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HOT TOURS */}
      <section id="tours" className="container py-16 md:py-20">
        <SectionTitle eyebrow="Успей забронировать" title="Горящие туры" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {hotTours.map((t) => (
            <div key={t.country} className="bg-card rounded-3xl overflow-hidden shadow-card hover-lift">
              <div className="relative h-52">
                <img src={t.img} alt={t.country} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Icon name="Flame" size={14} /> {t.badge}
                </span>
                <span className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-brand-blue">
                  <Icon name="Info" size={16} />
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-xl">{t.country}</h3>
                  <span className="text-brand-blue font-semibold">{t.city}</span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">{t.nights} · {t.note}</p>
                <div className="flex items-center justify-between mt-5">
                  <span className="font-display font-extrabold text-2xl text-brand-orange">{t.price}</span>
                  <Button className="rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white">Подробнее</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUMMER PLANS */}
      <section id="about" className="container pb-16 md:pb-20">
        <SectionTitle eyebrow="Идеи путешествий" title="Планы на лето" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {summerPlans.map((p) => (
            <div key={p.title} className="bg-card rounded-3xl p-7 shadow-card hover-lift flex items-start gap-4">
              <div className={`${p.color} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-soft`}>
                <Icon name={p.icon} size={26} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">{p.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FUN TRIPS */}
      <section className="bg-brand-blue/10 py-16 md:py-20">
        <div className="container">
          <SectionTitle eyebrow="Для настроения" title="Слетать развлечься" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {funTrips.map((f) => (
              <div key={f.title} className="bg-card rounded-3xl p-7 shadow-card hover-lift text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center mb-4">
                  <Icon name={f.icon} size={30} />
                </div>
                <h3 className="font-display font-bold text-xl">{f.title}</h3>
                <p className="text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEASON SWITCH */}
      <section className="container py-16 md:py-20">
        <div className="bg-brand-orange rounded-3xl p-8 md:p-12 shadow-soft text-white text-center">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl">Переключить сезон</h2>
          <div className="mt-6 inline-flex bg-white/20 rounded-full p-1.5">
            <button onClick={() => setSeason('summer')} className={`px-6 py-2.5 rounded-full font-semibold transition-all ${season === 'summer' ? 'bg-white text-brand-orange' : 'text-white'}`}>Лето 2025</button>
            <button onClick={() => setSeason('winter')} className={`px-6 py-2.5 rounded-full font-semibold transition-all ${season === 'winter' ? 'bg-white text-brand-orange' : 'text-white'}`}>Зима 2025/2026</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {seasonOffers[season].map((o) => (
              <div key={o} className="bg-white/15 rounded-2xl py-5 px-4 font-semibold animate-fade-up">{o}</div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE MAP */}
      <section className="container pb-16 md:pb-20">
        <SectionTitle eyebrow="Сравни направления" title="Карта цен" />
        <div className="flex gap-5 overflow-x-auto pb-4 mt-10 no-scrollbar snap-x">
          {priceMap.map((p) => (
            <div key={p.country} className="snap-start shrink-0 w-64 bg-card rounded-3xl p-6 shadow-card hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 text-brand-blue flex items-center justify-center">
                <Icon name="Plane" size={24} />
              </div>
              <h3 className="font-display font-bold text-xl mt-4">{p.country}</h3>
              <p className="font-display font-extrabold text-2xl text-brand-orange mt-1">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIRECTIONS GRID */}
      <section id="reviews" className="container pb-16 md:pb-20">
        <SectionTitle eyebrow="Куда хотите?" title="Выбери направление" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-10">
          {directions.map((d) => (
            <button
              key={d.name}
              onClick={() => setActiveDir(activeDir === d.name ? null : d.name)}
              className={`rounded-3xl p-6 md:p-8 shadow-card hover-lift flex flex-col items-center gap-3 transition-colors ${activeDir === d.name ? 'bg-brand-orange text-white' : 'bg-card'}`}
            >
              <Icon name={d.icon} size={32} className={activeDir === d.name ? 'text-white' : 'text-brand-orange'} />
              <span className="font-display font-bold">{d.name}</span>
            </button>
          ))}
        </div>
        {activeDir && (
          <div className="mt-6 bg-brand-blue/10 rounded-3xl p-6 text-center animate-fade-up">
            <p className="font-semibold">Показываем туры по направлению «{activeDir}». Подбор скоро будет готов!</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container pb-16 md:pb-20">
        <div className="bg-brand-blue rounded-3xl p-10 md:p-14 text-center text-white shadow-soft">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl">Не нашли подходящий тур?</h2>
          <p className="mt-3 text-white/90 max-w-xl mx-auto">Оставьте заявку — подберём идеальное путешествие под ваш бюджет и даты.</p>
          <Button className="mt-7 h-12 px-8 rounded-full bg-white text-brand-blue hover:bg-white/90 font-bold text-base gap-2">
            <Icon name="Send" size={18} /> Оставить заявку
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="bg-foreground text-white/80">
        <div className="container py-14 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-brand-orange flex items-center justify-center">
                <Icon name="Plane" className="text-white" size={20} />
              </div>
              <span className="font-display font-extrabold text-lg text-white">Тур Стори</span>
            </div>
            <p className="text-sm">Ваш надёжный проводник в мир ярких путешествий.</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Контакты</h4>
            <p className="text-sm">+7 800 123-45-67</p>
            <p className="text-sm mt-1">hello@turstory.ru</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Адрес офиса</h4>
            <p className="text-sm">Москва, ул. Тверская, 12</p>
            <p className="text-sm mt-1">Ежедневно 10:00 — 20:00</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Соцсети</h4>
            <div className="flex gap-3">
              {['Send', 'MessageCircle', 'Instagram', 'Youtube'].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center transition-colors">
                  <Icon name={s} size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-sm">
          © 2025 Тур Стори. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

const Field = ({ label, icon, children }: { label: string; icon: string; children: React.ReactNode }) => (
  <div>
    <label className="flex items-center gap-1.5 text-sm font-semibold mb-2 text-foreground/80">
      <Icon name={icon} size={15} className="text-brand-orange" /> {label}
    </label>
    {children}
  </div>
);

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="text-center">
    <span className="text-brand-orange font-display font-bold text-sm uppercase tracking-wider">{eyebrow}</span>
    <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">{title}</h2>
  </div>
);

export default Index;
