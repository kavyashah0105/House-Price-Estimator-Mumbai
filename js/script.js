// ---------- AUTH CONTROL ----------
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const user = localStorage.getItem("loggedInUser");
  const registeredUser = localStorage.getItem("registeredUser");
  const protectedPages = ["data.html", "estimator.html", "about.html", "contact.html"];

  // Prevent login before registration
  if (currentPage === "login.html" && !registeredUser) {
    alert("Please register before logging in.");
    window.location.href = "register.html";
  }

  // Redirect if not logged in and trying to access protected page
  if (protectedPages.includes(currentPage) && !user) {
    alert("You must log in to access this page.");
    window.location.href = "login.html";
  }

  // Logout function (works everywhere)
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("You have been logged out.");
      window.location.href = "login.html";
    });
  }
});

// ---------- REGISTER ----------
document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    localStorage.setItem("registeredUser", JSON.stringify({ username, password }));
    alert("Registration successful! Please log in to continue.");
    window.location.href = "login.html"; // Works both locally and on GitHub Pages
  } else {
    alert("Please enter both username and password.");
  }
});

// ---------- LOGIN ----------
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const registered = JSON.parse(localStorage.getItem("registeredUser"));

  if (registered && registered.username === username && registered.password === password) {
    localStorage.setItem("loggedInUser", username);
    alert("Login successful!");
    // Redirect to data.html safely
    if (window.location.href.includes("github.io")) {
      window.location.href = "data.html";
    } else {
      window.location.href = "./data.html";
    }
  } else {
    alert("Invalid credentials or user not registered.");
  }
});

// ---------- PRICE DATA ----------
const pricePerSqft = {
  Bandra: 32000,
  Andheri: 24000,
  Dadar: 28500,
  Chembur: 22000,
  Powai: 23500,
  Sion: 21000,
  Borivali: 18000,
  Gamdevi: 26500,
  Malad: 20500,
  "Navi Mumbai": 17500,
};

// ---------- LOCALITY INFO ----------
const localityInfo = {
  Bandra: "Bandra is Mumbai’s most glamorous suburb, known for its seafront promenades like Carter Road and Bandstand, lined with upscale cafes and luxury apartments. The area is home to numerous Bollywood celebrities, which contributes heavily to its prestige and high property rates. Land availability is limited, making every square foot extremely valuable. Pali Hill and Turner Road are renowned for their boutique stores and high-end residences. The suburb offers proximity to both BKC and South Mumbai, enhancing convenience. Bandra’s blend of colonial heritage and modern luxury attracts elite buyers. The sea views, nightlife, and cosmopolitan lifestyle justify its premium pricing. Its property market continues to outperform most Mumbai localities in demand and stability.",

  Andheri: "Andheri is a dynamic mix of residential, business, and entertainment hubs. The western part, including Lokhandwala and Versova, features upscale housing and a vibrant lifestyle. The presence of Andheri MIDC and SEEPZ makes it an important employment center. Its proximity to the international airport and multiple metro lines ensures strong connectivity across Mumbai. Andheri’s property prices are driven by constant redevelopment and rising demand from working professionals. The area’s nightlife, shopping centers, and film studios enhance its appeal. With continued infrastructure upgrades, Andheri remains one of Mumbai’s most balanced real-estate zones. Both families and young professionals find the area desirable for its accessibility and amenities.",

  Dadar: "Dadar holds a unique position as Mumbai’s geographical and cultural heart. It connects the city’s Central and Western railways, making it one of the most accessible areas. The locality is known for Shivaji Park, a large open space that serves as a landmark and recreational zone. Property rates here remain high due to heavy redevelopment projects and limited land availability. Dadar is surrounded by major business hubs like Prabhadevi, Lower Parel, and Worli. The neighborhood’s traditional markets and modern towers coexist in harmony. Its real-estate demand remains stable due to the blend of connectivity, heritage, and central positioning. Over the years, Dadar has evolved from an old suburb to a premium residential location.",

  Chembur: "Chembur offers a calm residential environment while staying close to Mumbai’s business hubs. It has witnessed significant infrastructure growth through the Eastern Freeway and Monorail. The area provides quick access to BKC and South Mumbai, making it ideal for professionals. Chembur Gymkhana, Diamond Garden, and several educational institutions add to its charm. The locality offers a mix of luxury apartments and old-style housing societies. It’s emerging as a preferred mid-range housing market due to its balance of affordability and connectivity. Developers are transforming old properties into modern complexes, further raising its appeal. The improving social and civic infrastructure continues to push real-estate growth steadily.",

  Powai: "Powai stands as one of Mumbai’s most scenic and planned localities, known for its beautiful Powai Lake and premium high-rises. The landmark Hiranandani Gardens township offers self-sufficient urban living with schools, hospitals, and retail options. It also houses IIT Bombay, attracting an educated and high-income demographic. The mix of greenery, open spaces, and cosmopolitan living standards adds great value. Its architecture and infrastructure reflect modern urban design. Property rates in Powai remain high due to limited supply and consistent demand from IT and corporate professionals. Powai combines the luxury of South Mumbai with the convenience of suburban life. The result is a sustainable and ever-growing housing market.",

  Sion: "Sion is one of Mumbai’s most strategically located areas, bridging Central and South Mumbai. The neighborhood hosts reputed educational institutions and hospitals, ensuring convenience for residents. Despite being older, it has maintained its relevance through redevelopment projects. It provides quick access to Dadar, Kurla, and BKC. Its location makes it ideal for working professionals and families seeking centrality without the premium of South Mumbai. The area also offers reliable public transport and local markets that add community value. New apartment complexes are gradually transforming Sion’s skyline. Demand remains strong as buyers prefer its connectivity and moderate pricing compared to neighboring zones.",

  Borivali: "Borivali is one of Mumbai’s most family-oriented and eco-friendly suburbs. The area is famous for its proximity to Sanjay Gandhi National Park, offering greenery rarely found in urban Mumbai. Property rates are relatively moderate, making it ideal for long-term homeowners. It has excellent suburban train and highway connectivity. The suburb includes several educational institutions and malls that support a comfortable lifestyle. Continuous infrastructure growth, such as the Metro Line 7, has improved accessibility. Borivali’s peaceful atmosphere attracts retirees and working-class families alike. The consistent balance between affordability, quality of life, and safety makes it a top residential choice.",

  Gamdevi: "Gamdevi is one of South Mumbai’s oldest and most prestigious localities. It lies near Marine Drive, Chowpatty, and Girgaon, offering proximity to heritage landmarks and the Arabian Sea. The architecture includes colonial-era buildings and premium apartment complexes. Property here is scarce and highly expensive due to its heritage value and limited development space. Gamdevi’s residents enjoy quick access to business hubs in Fort and Churchgate. It has strong cultural significance and is considered part of Mumbai’s old elite neighborhoods. Despite being densely packed, the area’s prestige remains unmatched. Gamdevi properties are long-term investments that retain value across market cycles.",

  Malad: "Malad is a rapidly developing suburb that blends residential, commercial, and entertainment zones. The locality’s growth is fueled by the Western Express Highway and Link Road connectivity. IT parks in Mindspace and Infinity Mall have made it a business and leisure hub. The housing market offers everything from budget flats to luxury towers. Malad’s steady appreciation makes it attractive for both end-users and investors. Its social infrastructure, including schools, malls, and hospitals, is improving quickly. The area serves as a bridge between the expensive Bandra-Andheri belt and affordable western suburbs. Overall, Malad provides urban convenience with moderate pricing.",

  "Navi Mumbai": "Navi Mumbai represents the future of metropolitan housing in the Mumbai region. It’s India’s most organized satellite city, planned with wide roads, proper zoning, and open spaces. The upcoming Navi Mumbai International Airport will significantly increase property values. Areas like Vashi, Kharghar, and Panvel are leading this growth. Navi Mumbai’s modern infrastructure, clean environment, and affordability attract working professionals. It offers better quality of life compared to most of mainland Mumbai. With upcoming metro and trans-harbor connectivity, it’s becoming a strong commercial and residential center. The steady growth rate indicates long-term potential for investors and homebuyers alike."
};

// ---------- NUMBER TO WORDS ----------
function numberToWords(num) {
  if (num === 0) return "zero";
  const a = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ];
  const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  function inWords(n) {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + " crore" + (n % 10000000 ? " " + inWords(n % 10000000) : "");
  }
  return inWords(num);
}

// ---------- ESTIMATOR ----------
document.getElementById("priceEstimatorForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const locality = document.getElementById("locality").value;
  const sqft = parseInt(document.getElementById("sqft").value);
  const result = document.getElementById("result");
  const info = document.getElementById("localityInfo");

  if (locality && sqft) {
    const rate = pricePerSqft[locality];
    const finalPrice = rate * sqft;
    const priceWords = numberToWords(Math.round(finalPrice));

    result.innerHTML = `<strong>₹${finalPrice.toLocaleString("en-IN")}</strong> (${priceWords} rupees)`;
    info.innerHTML = `<strong>${locality}:</strong> ${localityInfo[locality]}`;
  } else {
    alert("Please fill all fields correctly.");
  }
});
