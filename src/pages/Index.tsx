import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const TELEGRAM_URL = 'https://t.me/tourstory_agency';
const VK_URL = 'https://vk.ru/tourstory_agency';

type Tour = {
  country: string;
  city: string;
  nights: string;
  price: string;
  note: string;
  img: string;
  badge: string;
  description: string;
  region?: string;
};

// ─── ИЗОБРАЖЕНИЯ ────────────────────────────────────────────────────────────
const IMG = {
  hero:        'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/f2a257ab-31d3-45d0-9930-cc2f75f15328.jpg',
  antalya:     'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/045c3e28-3806-40bc-91bf-3c7d21074192.jpg',
  dubai:       'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/d81faa06-979e-47b3-97f8-8c2ada889aa8.jpg',
  istanbul:    'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/925b7d4d-9a35-4799-abe5-5b85a50d3983.jpg',
  pattaya:     'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/88287376-5851-471f-a83e-58409503328f.jpg',
  bali:        'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/3f15f18f-9088-4ffa-9887-ca46496cf3b4.jpg',
  sochi:       'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/03139531-e36b-4158-8b56-9d353b78f703.jpg',
  altai:       'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/f9f27043-5243-4f5d-80e2-ad4d29552911.jpg',
  maldives:    'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/2f31ff99-ae4c-4ca6-a521-babe2756bef0.jpg',
  rome:        'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/9d8668b0-352c-47f9-9393-313c4368326a.jpg',
  paris:       'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/d1fc4153-ec95-4561-87e0-06cd300479dc.jpg',
  santorini:   'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/12da17d0-3054-4fde-919e-0d7964bd6bf4.jpg',
  spb:         'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/3eac0a75-4b6d-48ca-8ee8-11d6d1fea446.jpg',
  moscow:      'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/122f4293-cb97-4735-aa3c-c0720837a22a.jpg',
  kazan:       'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/f0e294e1-3efd-42ef-9659-818f519a91ba.jpg',
  saudi:       'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/715a3cf5-9248-499b-8ef2-a048bd6bc9ec.jpg',
  africa:      'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/c1ada701-5b15-4cbf-9467-df95dbf5dde7.jpg',
  cruise:      'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/f3248e3d-6c61-42a4-ae85-2147c95ec068.jpg',
  barcelona:   'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/6dcd7fed-a2cc-4cf7-8ae0-0214c862620d.jpg',
  abkhazia:    'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/f069e7b1-f9f1-4fa6-b65e-c77596cdec42.jpg',
  // Новые
  hurghada:    'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/a2d80c29-d68d-4887-a6d4-7c0861ebccf6.jpg',
  gornoAltai:  'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/babce65b-9641-4661-a704-e9f90981831c.jpg',
  chemal:      'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/9d043726-a939-404d-abeb-5ecd43264317.jpg',
  thailand:    'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/eb4b7a01-b20b-48fe-b91c-3ec23a63655d.jpg',
  baliUbud:    'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/44ef1759-e0b2-482d-9950-fc4ba617638c.jpg',
  safari:      'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/693d3f3b-e6df-4fb6-9e93-ac4335a928a1.jpg',
  fjord:       'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/b41022c0-823b-454f-a539-706065399e17.jpg',
  madrid:      'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/5a55b3c8-c519-43b7-ae0a-abf863fef428.jpg',
  karlovyVary: 'https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/files/0d47ce93-c4f9-467c-a53c-69a7de2d09db.jpg',
};

// ─── ГОРЯЩИЕ ТУРЫ ─────────────────────────────────────────────────────────
const hotTours: Tour[] = [
  { country: 'Турция', city: 'Анталия', nights: '7 ночей', price: '56 000 ₽', note: 'за двоих · вылет завтра', img: IMG.antalya, badge: 'Горящий', region: 'Ближний Восток', description: 'Отель 5★ на первой линии с собственным песчаным пляжем. В стоимость входит перелёт, трансфер, проживание по системе «всё включено» и страховка. Вылет уже завтра из Москвы.' },
  { country: 'Египет', city: 'Хургада', nights: '5 ночей', price: '49 000 ₽', note: 'вылет через 3 дня', img: IMG.hurghada, badge: 'Выгодно', region: 'Африка', description: 'Тёплое Красное море, коралловые рифы и отель 4★ с аквапарком. Включены перелёт, трансфер, питание «всё включено» и медстраховка. Идеально для семейного отдыха.' },
  { country: 'ОАЭ', city: 'Дубай', nights: '7 ночей', price: '89 000 ₽', note: 'горящая путёвка', img: IMG.dubai, badge: 'Хит', region: 'Ближний Восток', description: 'Роскошный отель в центре Дубая рядом с Burj Khalifa. Перелёт, трансфер, завтраки и экскурсия по городу в подарок. Шопинг, небоскрёбы и пустынное сафари.' },
];

// ─── СТАМБУЛ (поиск) ───────────────────────────────────────────────────────
const istanbulTours: Tour[] = [
  { country: 'Турция', city: 'Стамбул', nights: '4 ночи', price: '38 000 ₽', note: 'отель 4★ в центре', img: IMG.istanbul, badge: 'Экскурсии', region: 'Европа', description: 'Обзорный тур по историческому центру: Голубая мечеть, Айя-София, дворец Топкапы и легендарный Гранд-базар. Отель 4★ в районе Султанахмет, завтраки, перелёт и трансфер включены.' },
  { country: 'Турция', city: 'Стамбул', nights: '6 ночей', price: '54 000 ₽', note: 'шопинг-тур', img: IMG.istanbul, badge: 'Шопинг', region: 'Европа', description: 'Шопинг-тур с проживанием рядом с торговыми кварталами Таксим и Истикляль. Перелёт, трансфер, отель 4★ и завтраки включены. Прогулки по Босфору и Египетскому базару.' },
  { country: 'Турция', city: 'Стамбул', nights: '5 ночей', price: '46 000 ₽', note: 'гастротур', img: IMG.istanbul, badge: 'Гастро', region: 'Европа', description: 'Гастрономический тур: дегустации турецкой кухни, кофейные церемонии и круиз по Босфору с ужином под звёздами. Отель 4★, завтраки, перелёт и трансфер.' },
];

// ─── ПЛАНЫ НА ЛЕТО — данные для карточек ──────────────────────────────────
const summerPlanTours: Record<string, Tour[]> = {
  'Сочи + Абхазия': [
    { country: 'Россия', city: 'Сочи', nights: '5 ночей', price: '28 000 ₽', note: 'Черноморское побережье', img: IMG.sochi, badge: 'Пляж', description: 'Тёплое Чёрное море, набережная и горы в одном месте. Отель 3★ у пляжа, завтраки, трансфер от аэропорта. Посещение Красной Поляны и дельфинария.' },
    { country: 'Абхазия', city: 'Гагра', nights: '4 ночи', price: '22 000 ₽', note: 'дикая природа', img: IMG.abkhazia, badge: 'Природа', description: 'Кипарисовые набережные, озеро Рица и водопады. Гостевой дом у моря, питание 3 раза в день, экскурсии с гидом. Незабываемая природа Кавказа.' },
  ],
  'Мальдивы': [
    { country: 'Мальдивы', city: 'Атолл Мале', nights: '7 ночей', price: '98 000 ₽', note: 'раннее бронирование −20%', img: IMG.maldives, badge: 'Раннее бронирование', description: 'Успейте забронировать по специальной цене! Вилла над бирюзовой лагуной, снорклинг с черепахами и манта-скатами. Перелёт, трансфер на катере и завтраки включены. Скидка действует до конца месяца.' },
    { country: 'Мальдивы', city: 'Атолл Ари', nights: '10 ночей', price: '140 000 ₽', note: 'люкс · раннее бронирование', img: IMG.maldives, badge: 'Люкс', description: 'Эксклюзивный резорт 5★ с собственным рифом. Бунгало на воде с панорамными окнами, дайвинг, СПА и изысканная кухня. Раннее бронирование — лучшее размещение по сниженной цене.' },
  ],
  'Алтай': [
    { country: 'Россия', city: 'Горно-Алтайск', nights: '7 ночей', price: '38 000 ₽', note: 'треккинг с гидом', img: IMG.gornoAltai, badge: 'Поход', description: 'Столица Республики Алтай — ворота в горный мир. Пешие маршруты по тайге и альпийским лугам с опытным гидом. Проживание на турбазе в окружении гор, питание и снаряжение включены. Маршруты для разных уровней подготовки.' },
    { country: 'Россия', city: 'Чемал', nights: '5 ночей', price: '29 000 ₽', note: 'экстрим и природа', img: IMG.chemal, badge: 'Экстрим', description: 'Чемал — жемчужина Алтая на слиянии рек Катунь и Чемал. Рафтинг по бирюзовой Катуни, конные прогулки вдоль берега и восхождения на скалы. Уютные домики в горах, свежий воздух и звёздное небо без городской засветки.' },
  ],
};

// ─── СЛЕТАТЬ РАЗВЛЕЧЬСЯ ───────────────────────────────────────────────────
const funTripTours: Record<string, Tour> = {
  'Стамбул': {
    country: 'Турция', city: 'Стамбул — Гранд-базар', nights: '4 ночи', price: '42 000 ₽', note: 'шопинг и гастрономия',
    img: IMG.istanbul, badge: 'Развлечения',
    description: 'Гранд-базар — крупнейший крытый рынок мира с 4 000 лавок: специи, ковры, украшения, кожа и керамика. Тур включает шопинг-экскурсию с гидом, дегустации турецких сладостей, прогулку по Босфору и отель 4★ в историческом центре.',
  },
  'Паттайя': {
    country: 'Таиланд', city: 'Паттайя', nights: '7 ночей', price: '75 000 ₽', note: 'ночная жизнь и пляжи',
    img: IMG.pattaya, badge: 'Ночная жизнь',
    description: 'Паттайя — столица ночных развлечений Юго-Восточной Азии. Знаменитая Walking Street, beach clubs, шоу кабаре Альказар, аква-парки и снорклинг на островах. Отель 4★ у пляжа, перелёт и трансфер включены.',
  },
  'Бали': {
    country: 'Индонезия', city: 'Бали', nights: '10 ночей', price: '95 000 ₽', note: 'сёрфинг, йога, природа',
    img: IMG.bali, badge: 'Активный',
    description: 'Бали — рай для сёрферов и любителей йоги. Легендарные волны Куты и Улувату, занятия с инструктором по сёрфингу, утренняя йога с видом на рисовые террасы. Вилла 4★ с бассейном, перелёт и трансфер включены.',
  },
};

// ─── КАРТА ЦЕН ────────────────────────────────────────────────────────────
const priceMapData: Array<{ country: string; price: string; img: string; description: string; icon: string }> = [
  { country: 'Турция', price: 'от 40 000 ₽', img: IMG.antalya, icon: 'Plane', description: 'Анталия, Кемер, Бодрум — пляжный отдых «всё включено», 7 ночей от 40 000 ₽ за двоих. Вылеты ежедневно.' },
  { country: 'Египет', price: 'от 50 000 ₽', img: IMG.hero, icon: 'Plane', description: 'Хургада и Шарм-эль-Шейх — Красное море, кораллы и солнце 365 дней в году. Туры от 50 000 ₽ за двоих, 7 ночей.' },
  { country: 'Таиланд', price: 'от 80 000 ₽', img: IMG.bali, icon: 'Plane', description: 'Пхукет и Самуи — тропические пляжи, экзотика и тайская кухня. 10 ночей от 80 000 ₽ с перелётом.' },
  { country: 'Мальдивы', price: 'от 120 000 ₽', img: IMG.maldives, icon: 'Plane', description: 'Атоллы Мале и Ари — роскошные резорты над водой, кристальный океан. 7 ночей от 120 000 ₽ с перелётом Москва–Мале.' },
  { country: 'ОАЭ', price: 'от 70 000 ₽', img: IMG.dubai, icon: 'Plane', description: 'Дубай и Абу-Даби — небоскрёбы, шопинг-молы и пустынные сафари. 7 ночей от 70 000 ₽ с перелётом из Москвы.' },
];

// ─── НАПРАВЛЕНИЯ ─────────────────────────────────────────────────────────
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

const directionTours: Record<string, Tour[]> = {
  'Европа': [
    { country: 'Италия', city: 'Рим + Флоренция', nights: '7 ночей', price: '89 000 ₽', note: 'экскурсионный тур', img: IMG.rome, badge: 'Культура', description: 'Колизей, Ватикан, галерея Уффици и каналы Венеции. Отель 4★ в центре Рима, перелёт, трансфер и русскоязычный гид. Незабываемое погружение в историю Европы.' },
    { country: 'Франция', city: 'Париж', nights: '5 ночей', price: '95 000 ₽', note: 'романтический тур', img: IMG.paris, badge: 'Романтика', description: 'Эйфелева башня, Лувр, Монмартр и прогулка на кораблике по Сене. Отель 4★ рядом с Champs-Élysées, завтраки и перелёт включены. Идеальный выбор для пар.' },
    { country: 'Греция', city: 'Санторини', nights: '7 ночей', price: '78 000 ₽', note: 'острова Эгейского моря', img: IMG.santorini, badge: 'Острова', description: 'Белоснежные домики с синими куполами над Эгейским морем, вулканические пляжи и знаменитые закаты в Ойе. Отель 4★, завтраки, перелёт и трансфер.' },
  ],
  'Азия': [
    { country: 'Таиланд', city: 'Пхукет', nights: '9 ночей', price: '85 000 ₽', note: 'отель 4★', img: IMG.thailand, badge: 'Хит', description: 'Белоснежные пляжи Андаманского моря, скалы-карсты на горизонте и снорклинг на островах Пхи-Пхи. Тайский массаж, уличный фуд и ночные рынки. Отель 4★, перелёт и трансфер включены.' },
    { country: 'Индонезия', city: 'Бали', nights: '10 ночей', price: '92 000 ₽', note: 'сёрфинг и йога', img: IMG.baliUbud, badge: 'Активный', description: 'Остров богов: изумрудные рисовые террасы Убуда, церемонии в древних храмах, волны Куты и закаты в Улувату. Вилла с бассейном 4★, перелёт, трансфер и страховка в стоимости.' },
  ],
  'Россия': [
    { country: 'Россия', city: 'Санкт-Петербург', nights: '4 ночи', price: '32 000 ₽', note: 'культурная столица', img: IMG.spb, badge: 'Культура', description: 'Эрмитаж, Петергоф, Исаакиевский собор и белые ночи. Отель 4★ в центре, завтраки и экскурсия с гидом. Жемчужина России на Неве.' },
    { country: 'Россия', city: 'Москва', nights: '3 ночи', price: '24 000 ₽', note: 'столичный уик-энд', img: IMG.moscow, badge: 'Столица', description: 'Красная площадь, Кремль, Третьяковка и парк Зарядье. Отель 4★ в пешей доступности от центра, завтраки. Отличный вариант для культурного уик-энда.' },
    { country: 'Россия', city: 'Казань', nights: '3 ночи', price: '22 000 ₽', note: 'третья столица России', img: IMG.kazan, badge: 'История', description: 'Казанский Кремль, Голубая мечеть Кул-Шариф, башня Сююмбике и татарская кухня. Отель 3★ в историческом центре, завтраки и экскурсия.' },
  ],
  'Ближний Восток': [
    { country: 'ОАЭ', city: 'Дубай', nights: '7 ночей', price: '89 000 ₽', note: 'город будущего', img: IMG.dubai, badge: 'Люкс', description: 'Burj Khalifa, Palm Jumeirah, торговые молы и пустынное сафари. Отель 5★, перелёт, трансфер и завтраки включены.' },
    { country: 'Саудовская Аравия', city: 'Эр-Рияд', nights: '5 ночей', price: '75 000 ₽', note: 'открытие страны', img: IMG.saudi, badge: 'Новинка', description: 'Саудовская Аравия открылась для туристов! Kingdom Tower, древний город Дирия, традиционные рынки и пустыня Руб-эль-Хали. Отель 5★, перелёт и трансфер.' },
  ],
  'Острова': [
    { country: 'Мальдивы', city: 'Атолл Мале', nights: '7 ночей', price: '120 000 ₽', note: 'вилла над водой', img: IMG.maldives, badge: 'Люкс', description: 'Бунгало над бирюзовой лагуной, снорклинг с черепахами и манта-скатами. Перелёт Москва–Мале, трансфер на катере, завтраки включены.' },
    { country: 'Греция', city: 'Санторини', nights: '6 ночей', price: '78 000 ₽', note: 'острова Эгейского моря', img: IMG.santorini, badge: 'Острова', description: 'Вулканические пляжи с красным и чёрным песком, знаменитые закаты в Ойе и вина местных виноградников. Отель 4★, завтраки и перелёт.' },
  ],
  'Африка': [
    { country: 'Египет', city: 'Хургада', nights: '5 ночей', price: '49 000 ₽', note: 'Красное море', img: IMG.hurghada, badge: 'Пляж', description: 'Хургада — главный курорт Красного моря с тёплой водой круглый год. Коралловые рифы в шаговой доступности, отель 4★ с аквапарком и анимацией. Перелёт, трансфер и питание «всё включено».' },
    { country: 'Кения', city: 'Масаи Мара', nights: '8 ночей', price: '145 000 ₽', note: 'сафари', img: IMG.safari, badge: 'Сафари', description: 'Сафари в легендарном заповеднике Кении: львы, слоны, жирафы и знаменитая миграция гну. Джип-туры на рассвете, закат над саванной с акациями. Лодж в национальном парке, перелёт и русскоязычный гид включены.' },
  ],
  'Круизы': [
    { country: 'Средиземное море', city: 'Круиз Италия–Греция', nights: '8 ночей', price: '98 000 ₽', note: 'лайнер 5★', img: IMG.cruise, badge: 'Круиз', description: 'Морской круиз на лайнере 5★ с заходом в Рим, Барселону, Афины и острова Греции. Каюта с иллюминатором, питание «полный пансион» и развлечения на борту включены.' },
    { country: 'Норвегия', city: 'Фьорды Норвегии', nights: '7 ночей', price: '120 000 ₽', note: 'северное сияние', img: IMG.fjord, badge: 'Природа', description: 'Круиз по норвежским фьордам на небольшом экспедиционном судне: водопады прямо со скал, города Берген и Тромсё, шанс увидеть северное сияние. Каюта с панорамным видом, питание включено.' },
  ],
  'Экскурсии': [
    { country: 'Испания', city: 'Барселона', nights: '6 ночей', price: '82 000 ₽', note: 'архитектура и культура', img: IMG.barcelona, badge: 'Экскурсия', description: 'Саграда Фамилия, Парк Гуэль, Готический квартал и пляж Барселонета. Экскурсионный тур с русскоязычным гидом, отель 4★ в центре, перелёт и завтраки.' },
    { country: 'Испания', city: 'Мадрид + Толедо', nights: '5 ночей', price: '75 000 ₽', note: 'история Испании', img: IMG.madrid, badge: 'История', description: 'Королевский дворец, музей Прадо, площадь Пуэрта-дель-Соль и средневековый Толедо на берегу Тахо. Тур с гидом по двум столицам испанской истории. Отель 4★, завтраки и перелёт включены.' },
  ],
  'Лечение': [
    { country: 'Чехия', city: 'Карловы Вары', nights: '10 ночей', price: '95 000 ₽', note: 'санаторий', img: IMG.karlovyVary, badge: 'СПА', description: 'Карловы Вары — знаменитый чешский курорт с 12 лечебными минеральными источниками. Колоннады, питьевые галереи и вековые традиции водолечения. Проживание в санатории с питанием 3 раза в день, лечебные процедуры по программе и перелёт из Москвы.' },
  ],
};

const seasonOffers = {
  summer: ['Греция, острова — от 55 000 ₽', 'Турция, Кемер — от 42 000 ₽', 'Сочи, лето — от 28 000 ₽'],
  winter: ['ОАЭ, Дубай — от 70 000 ₽', 'Таиланд, Пхукет — от 85 000 ₽', 'Мальдивы — от 120 000 ₽'],
};

// ─── ПЛАНЫ НА ЛЕТО (карточки) ─────────────────────────────────────────────
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

// ─── КОМПОНЕНТ ────────────────────────────────────────────────────────────
const Index = () => {
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState<Date | undefined>();
  const [season, setSeason] = useState<'summer' | 'winter'>('summer');
  const [activeDir, setActiveDir] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [activeSummer, setActiveSummer] = useState<string | null>(null);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSearch = () => {
    setShowSearch(true);
    setTimeout(() => document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleSummerPlan = (title: string) => {
    setActiveSummer(activeSummer === title ? null : title);
    if (activeSummer !== title) {
      setTimeout(() => document.getElementById('summer-tours')?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center bg-foreground rounded-2xl px-3 py-1.5">
            <img
              src="https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/bucket/947fbf93-ca22-4150-b62c-e5e5e991d654.png"
              alt="Тур Стори"
              className="h-12 w-auto object-contain"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <button onClick={() => scrollTo('tours')} className="hover:text-brand-orange transition-colors">Туры</button>
            <button onClick={() => scrollTo('about')} className="hover:text-brand-orange transition-colors">О нас</button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-brand-orange transition-colors">Отзывы</button>
            <button onClick={() => scrollTo('contacts')} className="hover:text-brand-orange transition-colors">Контакты</button>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+74957443863" className="hidden lg:block font-display font-bold text-brand-orange">+7 (495) 744-38-63</a>
            <Button asChild className="rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold gap-2">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={18} />
                <span className="hidden sm:inline">Мессенджеры</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO + SEARCH */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="Путешествия" className="w-full h-full object-cover" />
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
              <Button onClick={handleSearch} className="h-11 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-base gap-2 shadow-soft">
                <Icon name="Search" size={18} /> Найти туры
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      {showSearch && (
        <section id="search-results" className="container pt-16 md:pt-20 animate-fade-up">
          <SectionTitle eyebrow="Результаты поиска" title="Туры в Стамбул" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {istanbulTours.map((t) => (
              <TourCard key={t.city + t.nights} t={t} onMore={() => setSelectedTour(t)} />
            ))}
          </div>
        </section>
      )}

      {/* HOT TOURS */}
      <section id="tours" className="container py-16 md:py-20">
        <SectionTitle eyebrow="Успей забронировать" title="Горящие туры" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {hotTours.map((t) => (
            <TourCard key={t.country + t.city} t={t} onMore={() => setSelectedTour(t)} />
          ))}
        </div>
      </section>

      {/* SUMMER PLANS */}
      <section id="about" className="container pb-16 md:pb-20">
        <SectionTitle eyebrow="Идеи путешествий" title="Планы на лето" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {summerPlans.map((p) => (
            <button
              key={p.title}
              onClick={() => handleSummerPlan(p.title)}
              className={`rounded-3xl p-7 shadow-card hover-lift flex items-start gap-4 text-left transition-colors w-full ${activeSummer === p.title ? 'bg-brand-orange text-white' : 'bg-card'}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-soft ${activeSummer === p.title ? 'bg-white/25' : p.color}`}>
                <Icon name={p.icon} size={26} className="text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">{p.title}</h3>
                <p className={`text-sm mt-1 ${activeSummer === p.title ? 'text-white/80' : 'text-muted-foreground'}`}>{p.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {activeSummer && (
          <div id="summer-tours" className="mt-8 animate-fade-up">
            <p className="text-center font-display font-bold text-xl mb-6">Туры · {activeSummer}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {summerPlanTours[activeSummer]?.map((t) => (
                <TourCard key={t.city + t.nights} t={t} onMore={() => setSelectedTour(t)} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FUN TRIPS */}
      <section className="bg-brand-blue/10 py-16 md:py-20">
        <div className="container">
          <SectionTitle eyebrow="Для настроения" title="Слетать развлечься" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {funTrips.map((f) => (
              <button
                key={f.title}
                onClick={() => setSelectedTour(funTripTours[f.title])}
                className="bg-card rounded-3xl p-7 shadow-card hover-lift text-center w-full"
              >
                <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center mb-4">
                  <Icon name={f.icon} size={30} />
                </div>
                <h3 className="font-display font-bold text-xl">{f.title}</h3>
                <p className="text-muted-foreground mt-1">{f.desc}</p>
              </button>
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
          {priceMapData.map((p) => (
            <button
              key={p.country}
              onClick={() => setSelectedTour({ country: p.country, city: p.country, nights: '7 ночей', price: p.price, note: 'от', img: p.img, badge: 'Туры', description: p.description })}
              className="snap-start shrink-0 w-64 bg-card rounded-3xl overflow-hidden shadow-card hover-lift text-left"
            >
              <div className="h-36 overflow-hidden">
                <img src={p.img} alt={p.country} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="w-10 h-10 rounded-2xl bg-brand-blue/15 text-brand-blue flex items-center justify-center">
                  <Icon name={p.icon} size={20} />
                </div>
                <h3 className="font-display font-bold text-xl mt-3">{p.country}</h3>
                <p className="font-display font-extrabold text-2xl text-brand-orange mt-1">{p.price}</p>
              </div>
            </button>
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
          <div className="mt-8 animate-fade-up">
            <p className="text-center font-display font-bold text-xl mb-6">Туры · {activeDir}</p>
            {directionTours[activeDir] && directionTours[activeDir].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {directionTours[activeDir].map((t) => (
                  <TourCard key={t.city + t.nights + t.price} t={t} onMore={() => setSelectedTour(t)} />
                ))}
              </div>
            ) : (
              <div className="bg-brand-blue/10 rounded-3xl p-6 text-center">
                <p className="font-semibold">Скоро добавим туры по этому направлению. Оставьте заявку — подберём индивидуально!</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container pb-16 md:pb-20">
        <div className="bg-brand-blue rounded-3xl p-10 md:p-14 text-center text-white shadow-soft">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl">Не нашли подходящий тур?</h2>
          <p className="mt-3 text-white/90 max-w-xl mx-auto">Оставьте заявку — подберём идеальное путешествие под ваш бюджет и даты.</p>
          <Button asChild className="mt-7 h-12 px-8 rounded-full bg-white text-brand-blue hover:bg-white/90 font-bold text-base gap-2">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="Send" size={18} /> Оставить заявку
            </a>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="bg-foreground text-white/80">
        <div className="container py-14 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img
                src="https://cdn.poehali.dev/projects/52386eab-c83f-484c-ba86-8e6a1d74b203/bucket/947fbf93-ca22-4150-b62c-e5e5e991d654.png"
                alt="Тур Стори"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm">Ваш надёжный проводник в мир ярких путешествий.</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Контакты</h4>
            <a href="tel:+74957443863" className="text-sm hover:text-white transition-colors">+7 (495) 744-38-63</a>
            <br />
            <a href="https://tour-story.ru" target="_blank" rel="noopener noreferrer" className="text-sm mt-1 hover:text-white transition-colors inline-block">tour-story.ru</a>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Адрес офиса</h4>
            <p className="text-sm">Московская область, городской округ Балашиха, деревня Федурново, улица Авиарембаза, 8</p>
            <p className="text-sm mt-2">Ежедневно 10:00 — 20:00</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Соцсети</h4>
            <div className="flex gap-3">
              {[
                { icon: 'Send', url: TELEGRAM_URL, label: 'Telegram' },
                { icon: 'Users', url: VK_URL, label: 'ВКонтакте' },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center transition-colors">
                  <Icon name={s.icon} size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-sm">
          © 2025 Тур Стори. Все права защищены.
        </div>
      </footer>

      {/* TOUR DETAILS DIALOG */}
      <Dialog open={!!selectedTour} onOpenChange={(o) => !o && setSelectedTour(null)}>
        <DialogContent className="rounded-3xl max-w-lg p-0 overflow-hidden">
          {selectedTour && (
            <>
              <div className="relative h-52">
                <img src={selectedTour.img} alt={selectedTour.city} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full">{selectedTour.badge}</span>
              </div>
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">{selectedTour.country}, {selectedTour.city}</DialogTitle>
                  <DialogDescription className="text-base text-foreground/70">{selectedTour.nights} · {selectedTour.note}</DialogDescription>
                </DialogHeader>
                <p className="mt-4 text-foreground/80 leading-relaxed">{selectedTour.description}</p>
                <div className="flex items-center justify-between mt-6">
                  <span className="font-display font-extrabold text-2xl text-brand-orange">{selectedTour.price}</span>
                  <Button asChild className="rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white gap-2">
                    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                      <Icon name="Send" size={18} /> Забронировать
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ─── ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ──────────────────────────────────────────
const TourCard = ({ t, onMore }: { t: Tour; onMore: () => void }) => (
  <div className="bg-card rounded-3xl overflow-hidden shadow-card hover-lift">
    <div className="relative h-52">
      <img src={t.img} alt={t.city} className="w-full h-full object-cover" />
      <span className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
        <Icon name="Flame" size={14} /> {t.badge}
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
        <Button onClick={onMore} className="rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white">Подробнее</Button>
      </div>
    </div>
  </div>
);

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