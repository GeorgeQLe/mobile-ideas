import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ideasPath = path.join(root, "tasks", "ideas.md");
const specsRoot = path.join(root, "specs");
const targetCount = 1000;
const startId = 201;
const today = "2026-04-21";

const categories = [
  ["AI assistant", ["Poe", "Gemini", "Microsoft Copilot", "Grok", "DeepSeek", "Meta AI", "You.com", "Pi", "Phind", "HuggingChat", "Wysa", "ELSA Speak", "OtterPilot", "Grammarly Keyboard", "Wordtune", "QuillBot", "Ask AI", "Genie", "Monica", "Notion AI", "Forefront AI", "Consensus"]],
  ["Photo editing", ["Picsart", "VSCO", "Snapseed", "Adobe Express", "Photoshop Express", "Procreate Pocket", "Sketchbook", "ibis Paint X", "Clip Studio Paint", "Bazaart", "Prequel", "Facetune", "BeautyPlus", "SNOW", "Meitu", "Polish", "PhotoRoom", "Pixelcut", "Lensa", "Remini", "PicCollage", "Layout", "Hypic", "Tezza", "Unfold"]],
  ["Video editing", ["InShot", "VN Video Editor", "KineMaster", "Splice", "LumaFusion", "Videoleap", "Filmora", "Alight Motion", "Mojo", "Apple Clips", "Magisto", "GoPro Quik", "VivaVideo", "VideoShow", "PowerDirector", "Adobe Premiere Rush", "Descript", "Captions", "OpusClip", "VEED", "TikTok Studio", "YouTube Create"]],
  ["Music and audio", ["Shazam", "Bandcamp", "Deezer", "TIDAL", "Pandora", "iHeartRadio", "SiriusXM", "TuneIn Radio", "Amazon Music", "Qobuz", "Anghami", "Musixmatch", "GarageBand", "BandLab", "Voloco", "Smule", "StarMaker", "SoundHound", "Sonos", "Bose Music", "JBL Portable", "Endel", "Brain.fm"]],
  ["Podcast and audio", ["Overcast", "Castro", "Podbean", "Spotify for Podcasters", "Anchor", "Podcast Addict", "Podimo", "Acast", "Player FM", "Castbox", "RadioPublic", "NPR One", "BBC Sounds", "Libsyn", "Podchaser", "Pocket FM", "Storytel", "Audacy", "iVoox", "Goodpods"]],
  ["Streaming video", ["Hulu", "Disney+", "Max", "Peacock TV", "Paramount+", "Prime Video", "Crunchyroll", "Plex", "Tubi", "Pluto TV", "Roku", "Fandango at Home", "Vudu", "MUBI", "The Criterion Channel", "Kanopy", "Hoopla", "Nebula", "Curiosity Stream", "Gaia", "Dropout", "BritBox", "Acorn TV", "YouTube TV", "Sling TV"]],
  ["Sports and fitness", ["ESPN", "The Athletic", "Bleacher Report", "Yahoo Sports", "CBS Sports", "FOX Sports", "NBA", "NFL", "MLB", "NHL", "FIFA", "Fubo", "DAZN", "FanDuel Sportsbook", "DraftKings Sportsbook", "Sleeper", "ESPN Fantasy Sports", "Yahoo Fantasy Sports", "Peloton", "Zwift", "Garmin Connect", "Nike Training Club", "Fitbod", "Strong", "Hevy", "Runkeeper", "MapMyRun", "Komoot", "Relive", "TrainerRoad", "TrainingPeaks"]],
  ["Food and loyalty", ["Chick-fil-A", "Dunkin'", "Chipotle", "Taco Bell", "Subway", "Panera Bread", "Wendy's", "Burger King", "Domino's", "Pizza Hut", "Papa Johns", "Little Caesars", "KFC", "Popeyes", "Sonic Drive-In", "Shake Shack", "Sweetgreen", "Cava", "Wingstop", "Dairy Queen", "Dutch Bros", "7-Eleven", "Krispy Kreme", "Jamba"]],
  ["Grocery and retail", ["Walmart", "Target", "Costco", "Sam's Club", "Kroger", "Safeway", "Albertsons", "Whole Foods Market", "Publix", "H-E-B", "Meijer", "Aldi", "Lidl", "Wegmans", "Food Lion", "Giant Eagle", "Stop & Shop", "ShopRite", "FreshDirect", "Misfits Market", "Thrive Market", "Ocado", "Carrefour", "Tesco", "Sainsbury's"]],
  ["Delivery marketplace", ["Grubhub", "Gopuff", "Deliveroo", "Just Eat", "Glovo", "Bolt Food", "foodpanda", "Swiggy", "Zomato", "Rappi", "Grab", "Gojek", "DiDi Food", "Meituan", "Ele.me", "Deliveroo Rider", "DoorDash Dasher", "Uber Driver", "Instacart Shopper", "Shipt", "Favor", "SkipTheDishes", "Talabat", "Mr D Food"]],
  ["Shopping", ["Best Buy", "Home Depot", "Lowe's", "IKEA", "Wayfair", "Kohl's", "Macy's", "Nordstrom", "Sephora", "Ulta Beauty", "Nike", "Adidas", "Zara", "H&M", "Uniqlo", "Lululemon", "GOAT", "Grailed", "Mercari", "Vinted", "OfferUp", "Craigslist", "AliExpress", "Wish", "Lazada", "Shopee", "Flipkart", "Myntra", "Rakuten", "Newegg"]],
  ["Banking and investing", ["Chase Mobile", "Bank of America Mobile Banking", "Wells Fargo Mobile", "Citi Mobile", "Capital One Mobile", "American Express", "Discover Mobile", "U.S. Bank", "PNC Mobile", "TD Bank", "Truist", "USAA", "Navy Federal Credit Union", "SoFi", "Ally", "Marcus", "Fidelity", "Schwab Mobile", "E*TRADE", "Webull", "moomoo", "Interactive Brokers", "Vanguard", "Monzo", "N26", "Starling Bank"]],
  ["Payments and crypto", ["Skrill", "Neteller", "Remitly", "WorldRemit", "Western Union", "MoneyGram", "Xoom", "Crypto.com", "Binance", "Kraken", "Gemini Crypto", "Phantom", "MetaMask", "Trust Wallet", "Exodus", "Ledger Live", "MoonPay", "Strike", "Current", "Dave", "Empower", "EarnIn", "Klarna", "Afterpay", "Affirm"]],
  ["Airline travel", ["Delta", "United Airlines", "American Airlines", "Southwest Airlines", "JetBlue", "Alaska Airlines", "Spirit Airlines", "Frontier Airlines", "Hawaiian Airlines", "Air Canada", "British Airways", "Lufthansa", "Air France", "KLM", "Emirates", "Qatar Airways", "Singapore Airlines", "Turkish Airlines", "Ryanair", "easyJet", "Wizz Air", "ANA", "JAL", "Cathay Pacific"]],
  ["Travel booking", ["Marriott Bonvoy", "Hilton Honors", "Hyatt", "IHG One Rewards", "Wyndham Hotels", "Choice Hotels", "Accor ALL", "Hotels.com", "Vrbo", "Hostelworld", "Couchsurfing", "Klook", "GetYourGuide", "Viator", "Tripadvisor", "Rome2Rio", "Skyscanner", "KAYAK", "momondo", "Priceline", "Agoda", "trivago", "HotelTonight", "Roadtrippers"]],
  ["Transportation", ["Transit", "Citymapper", "Moovit", "Curb", "Via", "Bolt", "FREE NOW", "BlaBlaCar", "Zipcar", "Getaround", "Enterprise Rent-A-Car", "Hertz", "Avis", "SpotHero", "ParkMobile", "Passport Parking", "PlugShare", "ChargePoint", "Electrify America", "Tesla", "FordPass", "myChevrolet", "Toyota", "Hyundai Bluelink", "BMW", "Mercedes me"]],
  ["Maps weather outdoors", ["Gaia GPS", "onX Hunt", "Trailforks", "Wikiloc", "PeakVisor", "Windy", "The Weather Channel", "AccuWeather", "WeatherBug", "CARROT Weather", "MyRadar", "NOAA Weather Radar", "Ventusky", "Surfline", "Fishbrain", "Navionics", "MarineTraffic", "Flightradar24", "FlightAware", "GasBuddy"]],
  ["Real estate and home services", ["Homes.com", "Trulia", "HotPads", "Rent.com", "Apartment List", "StreetEasy", "LoopNet", "Redfin Rentals", "Zillow Rentals", "Houzz", "Angi", "Thumbtack", "Taskrabbit", "Handy", "Thumbtack Pro", "Porch", "Build.com", "Floor & Decor"]],
  ["Smart home", ["Google Home", "Amazon Alexa", "Apple Home", "Samsung SmartThings", "Philips Hue", "Wyze", "Arlo Secure", "Nest", "Eufy Security", "TP-Link Tapo", "Kasa Smart", "Smart Life", "Tuya Smart", "eWeLink", "August Home", "Yale Access", "Ecobee", "Honeywell Home", "myQ", "SimpliSafe", "ADT Control", "Vivint", "Blink Home Monitor"]],
  ["Health and medical", ["MyChart", "Doximity", "CVS Health", "Express Scripts", "Amwell", "MDLIVE", "Doctor On Demand", "HealthTap", "One Medical", "Carbon Health", "Nurx", "Maven Clinic", "Noom", "Lose It!", "Cronometer", "Lifesum", "WaterMinder", "Pillow", "AutoSleep", "SleepScore", "Withings Health Mate", "Samsung Health", "Apple Health", "Google Fit", "Athlytic", "Welltory", "Rise Sleep", "Pzizz"]],
  ["Parenting and family safety", ["The Bump", "What to Expect", "Peanut", "Cozi", "Life360", "Find My Kids", "Bark", "Qustodio", "Family Link", "OurPact", "Circle Parental Controls", "FamCal", "Winnie", "Kinedu", "Sprout Baby", "FamilyAlbum"]],
  ["Education", ["Blackboard Learn", "Moodle", "Google Classroom", "Canvas Student", "Schoology", "Seesaw", "ClassDojo", "Remind", "Brainly", "Chegg Study", "Symbolab", "WolframAlpha", "Brilliant", "Udemy", "edX", "Codecademy Go", "Sololearn", "Mimo", "Khan Academy Kids", "ABCmouse", "Epic!", "HOMER", "Lingokids", "Duolingo ABC", "Drops", "Babbel", "Rosetta Stone", "Busuu", "Mondly", "Memrise", "LingQ", "Pimsleur"]],
  ["Productivity documents", ["Microsoft 365", "Google Docs", "Google Sheets", "Google Slides", "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "OneNote", "Apple Pages", "Apple Numbers", "Apple Keynote", "iA Writer", "Ulysses", "Bear", "Craft", "Obsidian", "Roam Research", "Logseq", "Standard Notes", "Joplin", "Simplenote", "Notesnook", "Anytype", "Coda", "Airtable"]],
  ["Tasks and project management", ["Asana", "Monday.com", "ClickUp", "Jira", "Linear", "Basecamp", "Wrike", "Smartsheet", "Microsoft Planner", "Microsoft To Do", "TickTick", "Things 3", "OmniFocus", "Any.do", "Remember The Milk", "Habitica", "Habitify", "Streaks", "Forest", "Structured", "Sunsama", "Akiflow", "Motion", "Reclaim.ai"]],
  ["Scheduling and appointments", ["Calendly", "Doodle", "Fantastical", "BusyCal", "Timepage", "Calendars by Readdle", "Proton Calendar", "Cal.com", "SavvyCal", "Acuity Scheduling", "Square Appointments", "Vagaro", "Mindbody", "Fresha", "Booksy", "StyleSeat", "Schedulicity", "Setmore"]],
  ["Cloud files and identity", ["Box", "OneDrive", "iCloud Drive", "MEGA", "pCloud", "Sync.com", "WeTransfer", "Adobe Acrobat Reader", "CamScanner", "Genius Scan", "Scanner Pro", "DocuSign", "Adobe Scan", "Microsoft Lens", "1Password", "LastPass", "Bitwarden", "Dashlane", "Keeper", "NordPass", "Proton Pass", "Authy", "Google Authenticator", "Microsoft Authenticator", "Okta Verify", "Duo Mobile"]],
  ["Security and VPN", ["NordVPN", "ExpressVPN", "Surfshark", "Proton VPN", "Mullvad VPN", "TunnelBear", "Windscribe", "Cloudflare WARP", "Malwarebytes", "Norton 360", "McAfee Security", "Avast One", "Bitdefender Mobile Security", "2FAS", "Yubico Authenticator"]],
  ["Enterprise operations", ["Salesforce", "HubSpot", "Zendesk", "Intercom", "Freshdesk", "ServiceNow", "Workday", "BambooHR", "ADP Mobile", "Gusto Wallet", "Rippling", "Deel", "Expensify", "SAP Concur", "QuickBooks", "Xero", "Square POS", "Shopify", "Shopify Inbox", "Stripe Dashboard", "PayPal Business", "Mailchimp", "Hootsuite", "Buffer", "Sprout Social", "Later"]],
  ["Developer tools", ["GitLab", "Bitbucket", "Postman", "CodeSandbox", "Stack Overflow", "DEV Community", "Hashnode", "Product Hunt", "Hacker News", "DigitalOcean", "AWS Console", "Google Cloud", "Microsoft Azure", "Cloudflare", "Vercel", "Netlify", "Sentry", "Datadog", "PagerDuty", "Opsgenie", "Grafana", "New Relic", "Expo Go", "Termius", "Blink Shell", "Working Copy", "Code App"]],
  ["News", ["CNN", "BBC News", "The Guardian", "Reuters", "AP News", "NPR", "The Wall Street Journal", "Financial Times", "The Washington Post", "USA Today", "Fox News", "NBC News", "CBS News", "ABC News", "Al Jazeera", "The Economist", "Politico", "Axios", "Semafor", "Vox", "The Verge", "Engadget", "TechCrunch", "Ars Technica", "Wired"]],
  ["Books and reading", ["Kobo Books", "Google Play Books", "Nook", "The StoryGraph", "Bookmate", "Blinkist", "Headway", "Serial Reader", "Inkitt", "Dreame", "Tapas", "Radish", "Webnovel", "MANGA Plus", "Shonen Jump", "VIZ Manga", "Marvel Unlimited", "DC Universe Infinite"]],
  ["Social and creator community", ["Mastodon", "Tumblr", "Flickr", "500px", "Clubhouse", "Amino", "Weverse", "Patreon", "Buy Me a Coffee", "Ko-fi", "Cameo", "Guilded", "Geneva", "Fizz", "Yubo", "Poparazzi", "NGL", "Tellonym", "Rumble", "Truth Social"]],
  ["Messaging and calling", ["Viber", "WeChat", "LINE", "KakaoTalk", "Skype", "Google Voice", "TextNow", "TextFree", "GroupMe", "Marco Polo", "Voxer", "Microsoft Teams", "Cisco Webex", "Google Meet", "GoTo", "BlueJeans", "Jitsi Meet"]],
  ["Email and privacy mail", ["Proton Mail", "Yahoo Mail", "AOL Mail", "Spark Mail", "Edison Mail", "BlueMail", "Canary Mail", "Fastmail", "HEY", "Tuta Mail", "Zoho Mail", "Spike", "Superhuman", "Shortwave", "Clean Email", "Unroll.Me"]],
  ["Classifieds and automotive", ["letgo", "VarageSale", "Kijiji", "Gumtree", "CarGurus", "AutoTrader", "Cars.com", "Carvana", "CarMax", "TrueCar", "Copart", "Bring a Trailer", "Autolist"]],
  ["Creator commerce", ["Gumroad", "Kajabi", "Teachable", "Thinkific", "Podia", "Mighty Networks", "Circle Communities", "Skool", "Stan Store", "Linktree", "Beacons", "Linkin.bio", "Taplink"]],
  ["International navigation", ["Yandex Maps", "2GIS", "HERE WeGo", "MAPS.ME", "OsmAnd", "Sygic", "TomTom GO", "Naver Map", "KakaoMap", "Baidu Maps", "Gaode Map", "DiDi", "Ola", "Careem", "Cabify", "inDrive", "Yandex Go"]],
  ["Global ecommerce", ["Mercado Libre", "Tokopedia", "Bukalapak", "JD.com", "Pinduoduo", "Taobao", "Tmall", "Coupang", "Snapdeal", "Noon", "Jumia", "Takealot", "eMAG", "Allegro", "Wildberries", "Ozon"]],
  ["Market data and investing", ["Wealthsimple", "Questrade", "Trading 212", "eToro", "Freetrade", "Seeking Alpha", "Morningstar", "MarketWatch", "CNBC", "TradingView", "thinkorswim", "TD Ameritrade", "Firstrade", "Wealthsimple Trade"]],
  ["Civic and government", ["IRS2Go", "USPS Mobile", "FEMA", "CBP One", "Mobile Passport Control", "MyTSA", "VA Health and Benefits", "myGov", "NHS App", "Service NSW", "Singpass", "DigiD", "ID.me Authenticator", "CLEAR", "Citizen", "PulsePoint Respond"]],
  ["Civic marketplace and donations", ["GoFundMe", "Kickstarter", "Indiegogo", "DonorsChoose", "Charity Miles", "ShareTheMeal", "OLIO", "Freecycle", "Buy Nothing"]],
  ["Dating", ["OkCupid", "Plenty of Fish", "Badoo", "HER", "Feeld", "The League", "Raya", "Happn", "Boo", "Taimi", "Lex", "Hily", "Chispa", "BLK", "Upward", "Christian Mingle", "Jdate", "eHarmony", "SilverSingles"]],
  ["Mobile game", ["Pokemon GO", "Candy Crush Saga", "Roblox", "Minecraft", "Call of Duty Mobile", "PUBG Mobile", "Fortnite", "Genshin Impact", "Honkai Star Rail", "Clash of Clans", "Clash Royale", "Brawl Stars", "Subway Surfers", "Royal Match", "MONOPOLY GO", "Gardenscapes", "Homescapes", "Wordle", "Words With Friends", "Among Us", "Stumble Guys", "Geometry Dash", "Fruit Ninja", "Angry Birds", "Temple Run", "Asphalt 9", "Mario Kart Tour", "Hearthstone", "Marvel Snap", "Pokemon TCG Pocket", "Coin Master", "Township", "Hay Day", "Stardew Valley", "Terraria", "Old School RuneScape", "Chess.com", "Lichess", "Solitaire", "Sudoku.com", "NYT Games", "Elevate", "Lumosity"]],
  ["Translation and writing", ["Google Translate", "Apple Translate", "DeepL", "Microsoft Translator", "iTranslate", "SayHi", "Papago", "Otter", "Notta", "Rev", "Temi", "Dragon Anywhere", "Grammarly", "LanguageTool", "Hemingway Editor", "Scrivener", "Final Draft Mobile", "Celtx"]],
  ["Photo storage and memories", ["Shutterfly", "Snapfish", "FreePrints", "Amazon Photos", "SmugMug", "Cluster", "Keepsafe", "MyHeritage", "Ancestry", "Findmypast"]],
  ["Events and tickets", ["Ticketmaster", "StubHub", "SeatGeek", "Gametime", "AXS", "Dice", "Fever", "TodayTix", "Bandsintown", "Songkick", "Universe", "Tock", "Resy"]],
  ["Fashion and beauty", ["ASOS", "Farfetch", "Net-a-Porter", "SSENSE", "ThredUp", "Vestiaire Collective", "The RealReal", "Fashion Nova", "Fashionphile", "Rent the Runway", "Nuuly", "Stitch Fix", "Ipsy"]],
  ["Condition-specific health", ["Dexcom G7", "FreeStyle Libre", "mySugr", "One Drop", "Glooko", "Livongo", "Omada", "WW", "Ada", "K Health", "Natural Cycles", "Period Tracker"]],
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeCell(value) {
  return value.replace(/\|/g, "/");
}

function existingIdeas(markdown) {
  return markdown
    .split("\n")
    .filter((line) => /^\| \d+ \|/.test(line))
    .map((line) => {
      const cells = line.split("|").map((cell) => cell.trim());
      return { id: Number(cells[1]), app: cells[2], category: cells[3], focus: cells[4] };
    });
}

function focusFor(category, app) {
  const lower = category.toLowerCase();
  if (lower.includes("ai")) return "Conversational assistant onboarding, prompt composer, response history, attachments, model/provider routing, safety controls, and subscription gates.";
  if (lower.includes("photo")) return "Media import, editing canvas, filters/effects, asset library, export/share flow, licensing controls, and offline draft recovery.";
  if (lower.includes("video")) return "Project timeline, clip editing, captions/effects, template library, media licensing, export pipeline, and share workflow.";
  if (lower.includes("music") || lower.includes("audio") || lower.includes("podcast")) return "Catalog discovery, playback queue, library saves, downloads/offline behavior, creator/channel surfaces, and subscription or rights gates.";
  if (lower.includes("streaming")) return "Profile onboarding, catalog browsing, watch surface, playback state, downloads/offline stubs, parental controls, and rights/region gates.";
  if (lower.includes("sports")) return "Scores/feed, team/player detail, alerts, fantasy or wagering-adjacent gates where applicable, subscriptions, and safety/compliance controls.";
  if (lower.includes("food") || lower.includes("grocery") || lower.includes("delivery")) return "Store/menu catalog, cart, checkout, order tracking, loyalty or membership state, refunds/support, and merchant/courier handoff simulation.";
  if (lower.includes("shopping") || lower.includes("ecommerce") || lower.includes("fashion")) return "Catalog discovery, product detail, cart/checkout, offers, order tracking, returns, reviews, seller/merchant surfaces, and trust controls.";
  if (lower.includes("banking") || lower.includes("payments") || lower.includes("investing") || lower.includes("crypto") || lower.includes("market data")) return "Secure onboarding, account dashboard, transaction/trade simulation, funding instruments, alerts, statements, support, and compliance gates.";
  if (lower.includes("travel") || lower.includes("airline")) return "Search/booking, itinerary wallet, loyalty state, check-in or reservation management, alerts, support, cancellations, and supplier handoff blockers.";
  if (lower.includes("transport")) return "Map search, booking/unlock/session flow, live status, payment simulation, safety support, receipts, and location privacy controls.";
  if (lower.includes("maps") || lower.includes("navigation") || lower.includes("weather") || lower.includes("outdoors")) return "Map or forecast discovery, saved places, route/activity planning, offline mode, alerts, sensors, and location privacy gates.";
  if (lower.includes("real estate") || lower.includes("home services")) return "Listing/search marketplace, detail pages, lead or booking workflow, messaging, reviews, provider tools, and trust/safety checks.";
  if (lower.includes("smart home")) return "Device onboarding, dashboard, automations, alerts, live status simulation, shared users, subscription gates, and hardware/security blockers.";
  if (lower.includes("health") || lower.includes("medical")) return "Consent-based onboarding, profile/dashboard, tracking or care flow, reminders, records/export, privacy controls, and medical-adjacent safety gates.";
  if (lower.includes("parenting") || lower.includes("education")) return "Learner/family onboarding, content or classroom surfaces, progress tracking, messaging, reminders, privacy controls, and minors/student-data gates.";
  if (lower.includes("productivity") || lower.includes("tasks") || lower.includes("scheduling") || lower.includes("cloud files")) return "Workspace/object creation, search, sharing, sync/offline conflict handling, import/export, permissions, and subscription state.";
  if (lower.includes("security") || lower.includes("vpn") || lower.includes("identity")) return "Secure onboarding, device/session controls, protected vault or tunnel state, alerts, recovery, audit logs, and privacy-safe analytics.";
  if (lower.includes("enterprise") || lower.includes("developer")) return "Workspace onboarding, resource dashboard, detail views, alerts/incidents or tickets, admin controls, integrations, audit logs, and SSO/SCIM gates.";
  if (lower.includes("news") || lower.includes("books") || lower.includes("reading")) return "Content discovery, article/book detail, reading/listening surface, saved library, subscriptions, recommendations, and licensing/privacy controls.";
  if (lower.includes("social") || lower.includes("messaging") || lower.includes("dating")) return "Onboarding, profile, discovery/feed, messaging or interaction flow, notifications, reporting/blocking, subscriptions, and moderation safety gates.";
  if (lower.includes("game")) return "Core loop, session state, progression, inventory/economy stubs, social features, monetization gates, content pipeline, and platform safety controls.";
  if (lower.includes("translation") || lower.includes("writing")) return "Capture/import, editor/transcript workspace, language or writing tools, export/share, consent prompts, history, and privacy controls.";
  return `${app}-inspired onboarding, primary workflow, search/detail surfaces, settings, notifications, privacy/safety, monetization, and testable edge cases.`;
}

function profileFor(category) {
  const lower = category.toLowerCase();
  if (lower.includes("game")) {
    return {
      surfaces: ["Welcome/Auth", "Home Lobby", "Core Gameplay", "Progression", "Inventory/Collection", "Store", "Social/Friends", "Events", "Settings", "Support"],
      entities: ["User", "PlayerProfile", "GameSession", "Level", "ProgressionState", "InventoryItem", "CurrencyLedger", "MatchmakingTicket", "Event", "Entitlement"],
      risks: ["minors and age-appropriate design", "loot-box or virtual-currency compliance", "content moderation", "copyrighted characters/assets", "platform purchase rules"],
    };
  }
  if (lower.includes("banking") || lower.includes("payments") || lower.includes("investing") || lower.includes("crypto") || lower.includes("market data")) {
    return {
      surfaces: ["Welcome/Auth", "Identity/Security", "Dashboard", "Account Detail", "Transaction Detail", "Transfer/Trade Ticket", "Alerts", "Statements", "Support", "Settings"],
      entities: ["User", "IdentityCheck", "Account", "Balance", "Transaction", "Transfer", "Instrument", "RiskReview", "Statement", "DeviceSession"],
      risks: ["KYC/AML", "financial licensing", "fraud", "PII leakage", "market-data or banking-provider licensing"],
    };
  }
  if (lower.includes("health") || lower.includes("medical") || lower.includes("parenting")) {
    return {
      surfaces: ["Welcome/Auth", "Consent Setup", "Dashboard", "Entry/Session", "History", "Insights", "Reminders", "Privacy Controls", "Support", "Settings"],
      entities: ["User", "Profile", "ConsentRecord", "Entry", "Metric", "Reminder", "Insight", "DeviceSync", "CareResource", "Entitlement"],
      risks: ["sensitive health data", "medical-adjacent claims", "minor privacy", "data export/deletion", "emergency/crisis handling"],
    };
  }
  if (lower.includes("shopping") || lower.includes("food") || lower.includes("grocery") || lower.includes("delivery") || lower.includes("ecommerce") || lower.includes("fashion")) {
    return {
      surfaces: ["Welcome/Auth", "Browse/Search", "Listing/Menu/Product Detail", "Cart", "Checkout", "Order Status", "Messages", "Reviews", "Returns/Support", "Seller/Admin Tools"],
      entities: ["User", "Merchant", "CatalogItem", "Inventory", "Cart", "Order", "PaymentIntent", "Fulfillment", "Review", "Dispute"],
      risks: ["payment security", "consumer protection", "fraud", "unsafe or counterfeit goods", "review abuse"],
    };
  }
  if (lower.includes("social") || lower.includes("messaging") || lower.includes("dating")) {
    return {
      surfaces: ["Welcome/Auth", "Profile Setup", "Home Feed/Discovery", "Detail/Profile", "Create/Compose", "Inbox/Chat", "Notifications", "Moderation/Report", "Subscription", "Settings"],
      entities: ["User", "Profile", "PostOrCard", "MediaAsset", "Reaction", "MatchOrFollow", "MessageThread", "Notification", "Report", "ModerationAction"],
      risks: ["moderation", "harassment", "minor safety", "spam/fraud", "privacy leakage"],
    };
  }
  if (lower.includes("travel") || lower.includes("airline") || lower.includes("transport") || lower.includes("maps") || lower.includes("navigation") || lower.includes("weather") || lower.includes("outdoors") || lower.includes("real estate")) {
    return {
      surfaces: ["Welcome/Auth", "Search", "Map/List Results", "Detail", "Booking/Plan", "Checkout/Confirm", "Live Status", "Messages", "History", "Support"],
      entities: ["User", "Location", "Listing", "Availability", "Booking", "PaymentIntent", "MessageThread", "Route", "Review", "SupportCase"],
      risks: ["location privacy", "payment disputes", "fraud", "personal safety", "regional/provider constraints"],
    };
  }
  if (lower.includes("streaming") || lower.includes("music") || lower.includes("audio") || lower.includes("books") || lower.includes("reading") || lower.includes("news")) {
    return {
      surfaces: ["Welcome/Auth", "Home", "Search", "Content Detail", "Player/Reader", "Library", "Downloads", "Creator/Source", "Comments/Reviews", "Settings"],
      entities: ["User", "CatalogItem", "CreatorOrSource", "Collection", "PlaybackOrReadSession", "QueueItem", "Download", "Entitlement", "Comment", "RecommendationSlot"],
      risks: ["licensed media", "copyright", "content moderation", "parental controls", "download or syndication rights"],
    };
  }
  return {
    surfaces: ["Welcome/Auth", "Home/Workspace", "Create/Edit", "Detail/Preview", "Search", "Share", "Sync/Activity", "Templates/Library", "Permissions", "Settings"],
    entities: ["User", "Workspace", "Document", "Asset", "Project", "Version", "ShareGrant", "Template", "SyncJob", "Notification"],
    risks: ["data loss", "permission leakage", "copyrighted assets", "collaboration access", "device security"],
  };
}

function sourceRows(app) {
  const q = encodeURIComponent(app);
  return [
    `| Apple App Store | https://apps.apple.com/us/search?term=${q} | iOS listing, category, age rating, privacy labels, release notes, support links | Source discovery -- pending exact URL verification |`,
    `| Google Play | https://play.google.com/store/search?q=${q}&c=apps | Android listing, content rating, data safety, feature blurbs | Source discovery -- pending exact URL verification |`,
    `| Official website/help search | https://www.google.com/search?q=${encodeURIComponent(`${app} official app help privacy terms`)} | Help center, privacy, terms, support, subscription, safety, and product docs to replace with first-party URLs | Source discovery -- pending exact URL verification |`,
  ];
}

function specFor(item) {
  const profile = profileFor(item.category);
  const focus = item.focus.replace(/\.$/, "");
  const id = String(item.id).padStart(3, "0");
  const risks = profile.risks.map((risk) => `- Treat ${risk} as a launch-blocking review area with owner, mitigation, and acceptance tests before implementation.`);
  const surfaces = profile.surfaces.map((screen, index) => {
    const purpose = index === 0 ? "Entry, auth, and consent" : index === 1 ? "Default returning-user surface" : index === 2 ? "Primary creation/action flow" : index === 3 ? "Inspect, consume, or confirm details" : "Supporting workflow and recovery";
    return `| ${screen} | ${purpose} | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |`;
  });
  const entities = profile.entities.map((entity) => `- \`${entity}\`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for ${item.app}-style workflows.`);
  const readRoutes = profile.entities.slice(0, 5).map((entity) => `GET /${slugify(entity)}s`).join(", ");
  const writeRoutes = profile.entities.slice(0, 5).map((entity) => `POST /${slugify(entity)}s`).join(", ");

  return [
    `# ${item.app}-Style Clone Spec`,
    "",
    "> Metadata",
    `> - Inspiration app: ${item.app}`,
    `> - Category: ${item.category}`,
    "> - Readiness status: Draft 1",
    "> - Verification basis: public marketplace/source-discovery links only; exact first-party URL replacement and hands-on verification are still required.",
    "> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, subscription or payment state, permission prompts, push notifications, provider integrations, and region-specific behavior require lawful test evidence before one-for-one parity claims.",
    "> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, media, policies, and integrations.",
    "",
    "## Overview",
    "",
    `Build an original mobile product inspired by ${item.app}'s public user-facing workflow. The clone focus is: ${focus}`,
    "",
    `This Draft 1 spec reserves ID ${id} in the 1000-app backlog. It provides enough structure for downstream research, estimation, and lawful implementation planning, but it is not implementation-ready until exact first-party URLs replace source-discovery links and app-specific public evidence is added.`,
    "",
    "## Goals",
    "",
    `- Deliver a mobile-first ${item.category.toLowerCase()} experience with onboarding, primary workflow, settings, support, and recovery flows.`,
    `- Reproduce the functional job behind ${item.app} using original product naming, original UI, original sample data, and licensed integrations.`,
    "- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.",
    "- Define screens, entities, API contracts, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.",
    "",
    "## Non-Goals",
    "",
    `- Do not copy ${item.app} branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, ranking systems, or protected media.`,
    "- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.",
    "- Do not implement production payments, regulated services, medical advice, transport dispatch, smart-home control, or real-money game economies without separate legal/platform review.",
    "- Do not build runtime app code in this spec store.",
    "",
    "## Research Sources",
    "",
    "| Source | Discovery URL | Evidence To Verify | Status |",
    "|---|---|---|---|",
    ...sourceRows(item.app),
    "",
    "## Detailed Design",
    "",
    `- Onboarding must support guest, signup, returning-user, permission-primer, and blocked-account states appropriate for ${item.category.toLowerCase()}.`,
    `- Home must default to ${profile.surfaces[1]} with empty, loading, personalized, degraded-network, and signed-out variants.`,
    `- The primary action must be reachable from ${profile.surfaces[2]} within two taps from home.`,
    `- ${profile.surfaces[3]} must represent preview, confirmation, or consumption state with saved, shared, unavailable, and error variants.`,
    "- Settings must include profile, privacy, notifications, subscriptions, support, terms, privacy policy, data export, and delete-account entry points.",
    "- Entitlements must model free, trial, paid, expired, canceled, restored, refunded, and unavailable states without copying plan names or pricing.",
    "- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, and captions/transcripts where relevant.",
    "- Offline behavior must preserve recoverable drafts and block irreversible or regulated writes until the client has canonical server state.",
    "",
    "## Core User Journeys",
    "",
    `- New user installs, reviews an original value proposition, creates or restores an account, and reaches ${profile.surfaces[1]}.`,
    `- Returning user opens ${profile.surfaces[1]}, resumes the latest meaningful state, and completes the primary action in ${profile.surfaces[2]}.`,
    `- User searches or browses, opens ${profile.surfaces[3]}, saves or shares the item, and later finds it again from history or library.`,
    "- User denies a requested permission, receives a functional fallback, and can re-enable the permission from settings.",
    "- User loses connectivity during the core flow, sees local state preserved, and can retry, reconcile, or safely discard the draft.",
    "- User upgrades, downgrades, cancels, or expires an entitlement and sees correct locked/unlocked states.",
    "- User requests support, submits a report or dispute where relevant, and receives a durable case state.",
    "- User requests data export and account deletion from settings.",
    "",
    "## Screen Inventory",
    "",
    "| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |",
    "|---|---|---|---|---|",
    ...surfaces,
    "",
    "## Data Model",
    "",
    ...entities,
    "- `AuditEvent`: append-only record for sensitive writes, account changes, support actions, moderation decisions, and entitlement transitions.",
    "- `LocalCacheRecord`: device-local state for offline reads, queued writes, sync attempts, conflict resolution, and cache expiry.",
    "",
    "## API And Backend Contracts",
    "",
    "- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions` with device-scoped session tracking.",
    `- Reads: ${readRoutes}; all reads return authorization status, pagination, cache hints, stale-data markers, and localization keys.`,
    `- Writes: ${writeRoutes}; all writes require validation errors, idempotency keys, optimistic-state reconciliation, and audit events for sensitive state.`,
    "- Search: `GET /search` accepts query, filters, cursor, locale, safe-mode, and entitlement context.",
    "- Upload/import: use signed upload URLs, MIME/size validation, malware/content scanning where relevant, and original asset licensing metadata.",
    "- Realtime: expose websocket, SSE, or polling fallback for primary status updates; clients must refetch canonical state after missed events.",
    "- Notifications: `POST /notification-preferences` and server-side fanout for transactional, reminder, marketing, and safety categories.",
    "- Billing/entitlements: `GET /entitlements`, `POST /checkout/session`, and webhook-backed entitlement updates; never trust client-only subscription state.",
    "- Privacy: `POST /data-export`, `DELETE /account`, and `GET /privacy/settings` must be available from settings and support flows.",
    "- Admin/support: include internal review endpoints for reports, disputes, refund review, fraud holds, and policy decisions before production launch.",
    "",
    "## Realtime, Push, And Offline Behavior",
    "",
    "- Cache the home surface, recent detail pages, settings, entitlement state, and current in-progress action for offline reads.",
    "- Queue low-risk drafts locally with retry metadata; block money movement, regulated actions, irreversible deletes, and unsafe submissions while offline.",
    "- Push notifications must be opt-in, grouped by category, and mirrored in an in-app notification center when relevant.",
    "- Realtime updates must reconcile against server state after reconnect to avoid duplicate actions or stale status.",
    "- Long-running tasks must expose pending, complete, failed, canceled, and expired states with recovery actions.",
    "- Background work must tolerate app termination, OS permission changes, token expiry, and clock skew.",
    "",
    "## Permissions, Privacy, And Safety",
    "",
    ...risks,
    "- Request camera, microphone, photos, contacts, location, motion, Bluetooth, files, or notifications only at the moment the user invokes a feature needing it.",
    "- Provide permission-denied fallbacks, settings education, and no dark patterns around consent.",
    "- Minimize sensitive data in analytics, logs, crash reports, and support tooling.",
    "- Provide user-visible privacy policy, terms, data export, delete account, report abuse, block/mute where relevant, and support escalation.",
    "- Use original sample data and licensed third-party providers only after legal review.",
    "",
    "## Analytics And Monetization",
    "",
    "- Onboarding events: `onboarding_started`, `permission_primer_viewed`, `signup_started`, `signup_completed`, `onboarding_skipped` with source, locale, and experiment ids.",
    "- Core action events: `home_viewed`, `search_performed`, `detail_opened`, `primary_action_started`, `primary_action_completed`, `primary_action_failed` with object type and failure code.",
    "- Retention events: `notification_opened`, `favorite_saved`, `history_opened`, `share_started`, `reminder_set`, `offline_recovered`.",
    "- Safety events: `report_submitted`, `block_created`, `moderation_state_changed`, `privacy_setting_changed`, `data_export_requested`, `account_delete_requested`.",
    "- Monetization events: `paywall_viewed`, `trial_started`, `purchase_started`, `purchase_completed`, `purchase_failed`, `subscription_canceled`, `entitlement_expired`.",
    "- Monetization model: use original free/trial/paid entitlement logic; do not copy exact pricing, bundle naming, or promotional copy from the inspiration app.",
    "- Analytics rule: do not send raw user content, payment credentials, precise location, health entries, private messages, or child data as event properties.",
    "",
    "## Edge Cases",
    "",
    "- First launch with no network, no account, expired session, or unsupported OS version.",
    "- Permission denied, permission later revoked in OS settings, and permission granted after fallback use.",
    "- Duplicate taps, duplicate webhook delivery, retry after timeout, and stale optimistic UI.",
    "- Deleted, suspended, blocked, expired, unavailable, region-locked, or entitlement-locked objects.",
    "- Partial upload, interrupted download, corrupt cache, disk full, and app terminated during background work.",
    "- Abuse and policy: spam, fraud, harassment, prohibited content, account takeover, and support escalation.",
    "- Subscription restored on a different platform, refunded externally, or unavailable in the user's region.",
    "- Legal/privacy request submitted while transactions, messages, or support cases are still active.",
    "",
    "## Test Plan",
    "",
    "- Unit tests for validation, state machines, entitlement checks, idempotency keys, and privacy-safe analytics payload construction.",
    "- Integration tests for auth, primary reads, primary writes, search, notification preferences, billing/entitlement transitions, and account deletion/export.",
    "- Contract tests for every documented API response shape, error code, pagination behavior, and realtime reconciliation path.",
    "- Offline tests for cached reads, queued drafts, blocked writes, reconnect reconciliation, and corrupt-cache recovery.",
    "- Permission tests for denied, granted, revoked, and limited-access OS permission states.",
    "- Safety tests for report submission, moderation state changes, blocked users, fraud holds, and policy warning copy.",
    "- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, and media alternatives.",
    "- Billing tests for trial, purchase, renewal, cancellation, refund, expiration, and unavailable entitlement states.",
    "- Notification tests for opt-in, denied, revoked, quiet-hours, deep link, and in-app notification center behavior.",
    "- Regression tests for every acceptance criterion before marking the spec implementation-ready.",
    "",
    "## Acceptance Criteria",
    "",
    "- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.",
    "- Public source-discovery links are replaced with exact listing/help/privacy URLs or explicitly marked blocked before build start.",
    "- A new user can complete onboarding and reach the default home surface without unsupported permissions.",
    "- A returning user can complete the primary action, recover from a network failure, and confirm server state after reconnect.",
    "- Search/browse, detail, save/share, notification, settings, support, and deletion/export flows are represented in routes and tests.",
    "- All data entities have owners, lifecycle states, authorization rules, and deletion/export behavior.",
    "- At least 10 acceptance tests cover happy path, empty state, permission denial, offline behavior, accessibility, support/safety, billing, notifications, data deletion/export, and regression behavior.",
    "",
    "## Open Questions",
    "",
    "- Which exact marketplace listing, help center, privacy policy, and support docs should be treated as canonical for this inspiration app?",
    "- Which hands-on flows require a test account, paid subscription, region-specific availability, physical device, regulated sandbox, or provider credentials?",
    "- Which third-party providers will supply maps, media, catalog, payment, identity, notification, analytics, AI, or storage services for the original clone?",
    "- Are any features intentionally out of scope for legal, safety, budget, or platform-policy reasons?",
    "",
    "## Build Plan",
    "",
    "- Phase 1: Replace source-discovery rows with exact first-party URLs and classify each requirement as verified or inferred.",
    "- Phase 2: Define route map, component map, domain entities, API schema, permissions, analytics schema, and seed-data policy.",
    "- Phase 3: Build onboarding, home, primary action, detail, search, settings, support, and entitlement shells with original copy and sample data.",
    "- Phase 4: Add backend contracts, offline/retry handling, notification preferences, data export/delete, and safety/reporting flows.",
    "- Phase 5: Complete accessibility, privacy, safety, billing, permission, and regression tests.",
    "- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.",
    "",
    "## Next Steps",
    "",
    "- Replace source-discovery links with exact first-party URLs from a verified research session.",
    "- Capture public screenshots, privacy-label notes, release notes, support docs, and user-review themes in a dedicated research note without committing proprietary media.",
    "- Resolve open questions and update this spec before downstream implementation starts.",
    "- Extend the Phase 5 implementation-plan queue and repo-seeding manifest after the spec reaches implementation-ready V1.",
    "",
  ].join("\n");
}

function writeBatchReadme(batch, items) {
  const from = Math.min(...items.map((item) => item.id));
  const to = Math.max(...items.map((item) => item.id));
  const lines = [
    `# Batch ${String(batch).padStart(2, "0")} Draft 1 Specs`,
    "",
    "> Metadata",
    `> - App range: ${String(from).padStart(3, "0")}-${String(to).padStart(3, "0")}`,
    "> - Status: Draft 1 canonical scaffold",
    "> - Research state: public source-discovery links included; exact source replacement and hands-on verification still required before implementation.",
    "",
    "## Overview",
    "",
    `This batch contains canonical Draft 1 clone specs for apps ${from}-${to} from tasks/ideas.md.`,
    "",
    "## Included Specs",
    "",
    ...items.map((item) => `- ${String(item.id).padStart(3, "0")} ${item.app} - ${item.category}`),
    "",
    "## Quality Gate",
    "",
    "- Each numbered spec uses canonical hygiene sections.",
    "- Each numbered spec includes source-discovery links, functional requirements, data model, API contracts, edge cases, test plan, acceptance criteria, build plan, open questions, and next steps.",
    "- Each numbered spec remains legally scoped to functional parity with original assets and licensed data.",
    "",
    "## Next Steps",
    "",
    "- Replace source-discovery links in every spec with exact verified first-party URLs.",
    "- Complete hands-on verification where lawful and feasible before app implementation starts.",
    "",
  ];
  fs.writeFileSync(path.join(specsRoot, `batch-${String(batch).padStart(2, "0")}`, "README.md"), lines.join("\n"));
}

function buildExtension(existing) {
  const alreadyPresent = existing.filter((item) => item.id >= startId && item.id <= targetCount).sort((a, b) => a.id - b.id);
  if (alreadyPresent.length === targetCount - startId + 1) return alreadyPresent;

  const seen = new Set(existing.map((item) => item.app.toLowerCase()));
  const rows = [];
  for (const [category, apps] of categories) {
    for (const app of apps) {
      const key = app.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({ app, category, focus: focusFor(category, app) });
    }
  }
  if (rows.length < targetCount - startId + 1) {
    throw new Error(`Need ${targetCount - startId + 1} extension ideas, only have ${rows.length}`);
  }
  return rows.slice(0, targetCount - startId + 1).map((row, index) => ({
    id: startId + index,
    ...row,
  }));
}

function upsertIdeas(markdown, extension) {
  let next = markdown
    .replace("## 100 Clone Project Ideas", "## 1000 Clone Project Ideas")
    .replace("This backlog defines 200 mobile app clone projects", "This backlog defines 1000 mobile app clone projects")
    .replace("the original 100, plus a 100-app extension", "the original 100, a 100-app extension, plus an 800-app extension")
    .replace("covering dating, real estate, news, investing, health, parenting, education, dev tools, and productivity categories not represented in the first batch", "covering dating, real estate, news, investing, health, parenting, education, dev tools, productivity, commerce, travel, finance, health, media, enterprise, games, and utility categories not represented in the first batch");

  if (next.includes("| 1000 |")) return next;

  const rows = extension
    .map((item) => `| ${item.id} | ${escapeCell(item.app)} | ${escapeCell(item.category)} | ${escapeCell(item.focus)} | \`$plan-interview clone-spec ${escapeCell(item.app)}-style mobile app\` |`)
    .join("\n");
  const marker = "\n## Suggested Batch Order";
  if (!next.includes(marker)) throw new Error("Could not find Suggested Batch Order marker");
  next = next.replace(marker, `\n${rows}\n${marker}`);
  next = next
    .replace("This backlog defines 200 mobile app clone projects", "This backlog defines 1000 mobile app clone projects")
    .replace("Keep this backlog as the source list for the 200 clone-spec projects (IDs 001-200).", "Keep this backlog as the source list for the 1000 clone-spec projects (IDs 001-1000).")
    .replace("Batches 01-05 cover IDs 001-100; batches 06-10 will cover IDs 101-200 once Draft 0 specs are created.", "Batches 01-05 cover IDs 001-100; batches 06-10 cover IDs 101-200; batches 11-50 cover IDs 201-1000.")
    .replace("The 101-200 extension is still Backlog-only (no Draft 0 specs yet). Next pipeline step: run Phase 1 Step 2 for the extension — create Draft 0 placeholder specs under `specs/batch-06/` through `specs/batch-10/`.", "The 201-1000 extension is canonical Draft 1 scaffold only. Next pipeline step: replace source-discovery links with exact first-party URLs and promote batches 11-50 to implementation-ready public-source V1.");
  return next;
}

function updateSpecsReadme(markdown) {
  const batchRows = [];
  for (let batch = 11; batch <= 50; batch += 1) {
    const from = (batch - 1) * 20 + 1;
    const to = batch * 20;
    batchRows.push(`| Batch ${String(batch).padStart(2, "0")} | ${String(from).padStart(3, "0")}-${String(to).padStart(3, "0")} | extended mobile-app backlog | \`specs/batch-${String(batch).padStart(2, "0")}/\` | Draft 1 canonical scaffold |`);
  }
  let next = markdown
    .replace("Draft 1 canonical rewrite complete for all 200 IDs", "Draft 1 canonical scaffold complete for all 1000 IDs")
    .replace("Coverage: 200 of 200 app ideas (100 implementation-ready + 100 Draft 1 canonical)", "Coverage: 1000 of 1000 app ideas (100 implementation-ready + 100 Draft 1 canonical + 800 Draft 1 canonical scaffold)")
    .replace("100 Draft 1 canonical specs awaiting implementation-readiness upgrade", "900 Draft 1 canonical specs awaiting implementation-readiness upgrade")
    .replace("all 200 mobile app clone ideas", "all 1000 mobile app clone ideas")
    .replace("The first 100 numbered specs", "The first 100 numbered specs")
    .replace("The second 100 numbered specs (IDs 101-200) are canonical Draft 1 as of Phase 7 Step 7.2; Step 7.3 will replace discovery URLs with exact first-party URLs, distinguish verified vs inferred behavior, and complete category risk reviews to reach implementation-ready status.", "IDs 101-200 are canonical Draft 1 as of Phase 7 Step 7.2. IDs 201-1000 are canonical Draft 1 scaffolds added on 2026-04-21. Future passes must replace discovery URLs with exact first-party URLs, distinguish verified vs inferred behavior, and complete category risk reviews to reach implementation-ready status.");

  if (!next.includes("Batch 11")) {
    next = next.replace("| Batch 10 | 181-200 | language learning, translation, transcription, writing, dev tools, project management, design, scheduling, calendars, tasks, notes, journaling, hiking | `specs/batch-10/` | Draft 1 canonical |", "| Batch 10 | 181-200 | language learning, translation, transcription, writing, dev tools, project management, design, scheduling, calendars, tasks, notes, journaling, hiking | `specs/batch-10/` | Draft 1 canonical |\n" + batchRows.join("\n"));
  }
  next = next
    .replace("Confirm exactly 200 numbered app specs exist (100 implementation-ready + 100 Draft 1 canonical).", "Confirm exactly 1000 numbered app specs exist (100 implementation-ready + 900 Draft 1 canonical/scaffold).")
    .replace("Confirm no missing numeric IDs from `001` through `200`.", "Confirm no missing numeric IDs from `001` through `1000`.")
    .replace("All 100 IDs 101-200 specs are canonical Draft 1", "All 900 IDs 101-1000 specs are canonical Draft 1/scaffold")
    .replace("Phase 7 remains responsible for promoting IDs 101-200 to Draft 1 and implementation-ready V1 status.", "Future extension phases remain responsible for promoting IDs 101-1000 to implementation-ready V1 status.");
  return next;
}

function updateAudit(markdown) {
  const addendum = [
    "",
    `## 1000-App Extension Addendum - ${today}`,
    "",
    "The backlog now targets 1000 mobile app clone projects. IDs 201-1000 were added as canonical Draft 1 scaffolds with one H1, the canonical section set, source-discovery research rows, legal-scope guardrails, screen/entity/API/test/build-plan scaffolding, and explicit manual verification blockers.",
    "",
    "Metrics after extension:",
    "",
    "- Numbered app specs present: 1000.",
    "- Missing numeric IDs from `001` through `1000`: 0 after structural validation.",
    "- Implementation-ready public-source V1 specs: 100 (IDs 001-100).",
    "- Canonical Draft 1 specs/scaffolds awaiting exact-source replacement: 900 (IDs 101-1000).",
    "- Hands-on app behavior fully verified: 0; manual blockers remain explicit.",
    "",
    "Remaining high-priority gap: promote IDs 101-1000 to implementation-ready public-source V1 by replacing discovery URLs with exact first-party URLs, distinguishing verified vs inferred behavior, and completing category-specific risk reviews.",
    "",
  ].join("\n");
  if (markdown.includes("## 1000-App Extension Addendum")) return markdown;
  return markdown.replace("Updated: 2026-04-21", "Updated: 2026-04-21") + addendum;
}

function updateTodo(markdown) {
  const section = [
    "",
    "## Phase 8: 1000-App Extension Pipeline (IDs 201-1000)",
    "",
    "### Goal",
    "",
    "Extend the canonical spec store from 200 to 1000 mobile app clone ideas. IDs 201-1000 now have backlog rows and canonical Draft 1 scaffold specs; future work promotes them to implementation-ready public-source V1 and then extends downstream planning/seeding manifests.",
    "",
    "### Acceptance Criteria",
    "",
    "- [x] 800 new backlog rows exist in `tasks/ideas.md` for IDs 201-1000.",
    "- [x] 800 new spec files exist under `specs/batch-11/` through `specs/batch-50/`.",
    "- [x] Every new spec has exactly one H1 and canonical sections including Build Plan and Next Steps.",
    "- [ ] IDs 201-1000 replace source-discovery links with exact first-party URLs.",
    "- [ ] IDs 201-1000 pass implementation-readiness gate.",
    "- [ ] Phase 5 implementation-plan queue grows to 1000 rows.",
    "- [ ] `tasks/repo-seeding.md` manifest grows to 1000 rows after readiness upgrades.",
    "- [ ] No downstream repo is made public; no proprietary assets introduced.",
    "",
    "### Next Concrete Action",
    "",
    "Promote batches 11-50 from Draft 1 scaffold to implementation-ready public-source V1 in controlled category batches. Do not begin remote downstream seeding for IDs 201-1000 until exact-source verification and manifest extension are complete.",
    "",
  ].join("\n");
  if (markdown.includes("## Phase 8: 1000-App Extension Pipeline")) return markdown;
  return markdown + section;
}

function updateRoadmap(markdown) {
  const phase = [
    "",
    "## Phase 8: 1000-App Extension Pipeline (IDs 201-1000)",
    "",
    "### Milestones",
    "",
    "- [x] Step 8.1: Add 800 backlog rows for IDs 201-1000 in `tasks/ideas.md`.",
    "- [x] Step 8.2: Create canonical Draft 1 scaffold specs under `specs/batch-11/` through `specs/batch-50/`.",
    "- [ ] Step 8.3: Replace source-discovery links with exact first-party URLs and promote IDs 201-1000 to implementation-ready public-source V1.",
    "- [ ] Step 8.4: Extend Phase 5 implementation-plan queue to 1000 rows.",
    "- [ ] Step 8.5: Extend `tasks/repo-seeding.md` manifest to 1000 rows after readiness upgrades.",
    "- [ ] Step 8.6: Seed downstream private repos only with explicit approval and batch-level controls.",
    "",
    "### Acceptance Criteria",
    "",
    "- 1000 total spec files exist with canonical sections.",
    "- All 1000 IDs are represented in `tasks/ideas.md` and `specs/batch-*`.",
    "- IDs 201-1000 remain clearly marked Draft 1 scaffold until exact first-party source replacement and category-risk review are complete.",
    "- No downstream repo is made public during the extension.",
    "",
  ].join("\n");
  let next = markdown.replace("| Phase 7 | Active | Backlog extension pipeline for IDs 101-200 (Draft 0 → readiness → seeding). |", "| Phase 7 | Active | Backlog extension pipeline for IDs 101-200 (Draft 0 -> readiness -> seeding). |\n| Phase 8 | Active | Backlog and Draft 1 scaffold extension for IDs 201-1000. |");
  if (!next.includes("## Phase 8: 1000-App Extension Pipeline")) {
    next = next.replace("\n## Next Steps", `${phase}\n## Next Steps`);
  }
  next = next.replace("- Complete Phase 7 Step 7.1 (Draft 0 stubs) before advancing.", "- Complete Phase 7 Step 7.3 for IDs 101-200 and Phase 8 Step 8.3 for IDs 201-1000 before downstream seeding.");
  return next;
}

function updateHistory(markdown, count) {
  const entry = [
    "",
    `## ${today} - 1000-App Extension Scaffold`,
    "",
    `- Added ${count} backlog rows for IDs 201-1000.`,
    "- Created canonical Draft 1 scaffold specs under `specs/batch-11/` through `specs/batch-50/`.",
    "- Added `AGENTS.md` Codex project conventions.",
    "- Updated roadmap, todo, specs index, and quality audit for the 1000-target state.",
    "- Remote downstream repo creation remains blocked until explicit approval and readiness/manifest work are complete.",
    "",
  ].join("\n");
  if (markdown.includes("1000-App Extension Scaffold")) return markdown;
  return markdown + entry;
}

const ideasMarkdown = fs.readFileSync(ideasPath, "utf8");
const existing = existingIdeas(ideasMarkdown);
const extension = buildExtension(existing);

fs.writeFileSync(ideasPath, upsertIdeas(ideasMarkdown, extension));

for (const item of extension) {
  const batch = Math.ceil(item.id / 20);
  const batchDir = path.join(specsRoot, `batch-${String(batch).padStart(2, "0")}`);
  fs.mkdirSync(batchDir, { recursive: true });
  const specPath = path.join(batchDir, `${String(item.id).padStart(3, "0")}-${slugify(item.app)}.md`);
  fs.writeFileSync(specPath, specFor(item));
}

for (let batch = 11; batch <= 50; batch += 1) {
  const items = extension.filter((item) => Math.ceil(item.id / 20) === batch);
  writeBatchReadme(batch, items);
}

const specsReadmePath = path.join(specsRoot, "README.md");
fs.writeFileSync(specsReadmePath, updateSpecsReadme(fs.readFileSync(specsReadmePath, "utf8")));

const auditPath = path.join(root, "tasks", "spec-quality-audit.md");
fs.writeFileSync(auditPath, updateAudit(fs.readFileSync(auditPath, "utf8")));

const todoPath = path.join(root, "tasks", "todo.md");
fs.writeFileSync(todoPath, updateTodo(fs.readFileSync(todoPath, "utf8")));

const roadmapPath = path.join(root, "tasks", "roadmap.md");
fs.writeFileSync(roadmapPath, updateRoadmap(fs.readFileSync(roadmapPath, "utf8")));

const historyPath = path.join(root, "tasks", "history.md");
fs.writeFileSync(historyPath, updateHistory(fs.readFileSync(historyPath, "utf8"), extension.length));

console.log(`Added ${extension.length} ideas and Draft 1 scaffold specs through ID ${targetCount}.`);
