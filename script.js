/**
 * ==========================================================================
 * القسم 1: إعداد وتكوين Firebase
 * ==========================================================================
 */
const firebaseConfig = {
  apiKey: "AIzaSyARoa62MQLEav7ny5PW4zNLWEqszuYqe8g",
  authDomain: "for-your-health-a7f91.firebaseapp.com",
  projectId: "for-your-health-a7f91",
  storageBucket: "for-your-health-a7f91.firebasestorage.app",
  messagingSenderId: "23377365267",
  appId: "1:23377365267:web:49be0d2c979e8f10ec72e6",
  measurementId: "G-MD3CPKX9EX"
};

// تهيئة خدمات Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
/**
 * ==========================================================================
 * القسم 2: القواميس والثوابت
 * ==========================================================================
 */

// ✅ إصلاح: إزالة المسافات الزائدة من المفاتيح والقيم
const arabicToEnglishMap = {
  "كيك": "cake",
  "حلويات": "cake",
  "حلى": "dessert",
  "دجاج": "chicken",
  "لحم": "beef",
  "سمك": "fish",
  "جمبري": "shrimp",
  "أرز": "rice",
  "رز": "rice",
  "سلطة": "salad",
  "شوربة": "soup",
  "معكرونة": "pasta",
  "باستا": "pasta",
  "بيتزا": "pizza",
  "بيض": "egg",
  "شوفان": "oats"
};

// ✅ إصلاح: إزالة المسافات الزائدة من مفاتيح أخطاء المصادقة
function authErrorText(code) {
  const messages = {
    "auth/invalid-credential": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    "auth/invalid-email": "صيغة البريد الإلكتروني غير صحيحة",
    "auth/user-not-found": "لا يوجد حساب بهذا البريد",
    "auth/wrong-password": "كلمة المرور غير صحيحة",
    "auth/email-already-in-use": "هذا البريد مسجّل مسبقًا، جرّب تسجيل الدخول",
    "auth/weak-password": "كلمة المرور ضعيفة (6 أحرف على الأقل)",
    "auth/too-many-requests": "محاولات كثيرة، حاول لاحقًا",
    "auth/network-request-failed": "تحقق من اتصال الإنترنت",
    "auth/popup-closed-by-user": "تم إغلاق نافذة Google قبل إكمال الدخول",
    "auth/popup-blocked": "المتصفح منع النافذة المنبثقة، اسمح بها وأعد المحاولة",
    "auth/cancelled-popup-request": "تم إلغاء الطلب، حاول مرة أخرى",
    "auth/operation-not-allowed": "هذه الطريقة غير مفعّلة في Firebase Console",
    "auth/unauthorized-domain": "هذا النطاق غير مضاف في Authorized domains بـ Firebase",
    "auth/operation-not-supported-in-this-environment": "شغّل الموقع عبر سيرفر (http/https) وليس file://"
  };
  return messages[code] || "حدث خطأ غير متوقع: " + (code || "unknown");
}
/**
 * ==========================================================================
 * القسم 3: عناصر الـ DOM
 * ==========================================================================
 */

// ✅ إصلاح: إزالة المسافات الزائدة من جميع المعرفات
// عناصر الشريط العلوي والمصادقة
const authBtn            = document.getElementById("authBtn");
const themeToggleBtn     = document.getElementById("themeToggle");
const searchForm         = document.getElementById("searchForm");
const authModal          = document.getElementById("authModal");
const authModalClose     = document.getElementById("authModalClose");
const authForm           = document.getElementById("authForm");
const authEmail          = document.getElementById("authEmail");
const authPassword       = document.getElementById("authPassword");
const authTitle          = document.getElementById("authTitle");
const authDescription    = document.getElementById("authDescription");
const authSubmitBtn      = document.getElementById("authSubmitBtn");
const googleAuthBtn      = document.getElementById("googleAuthBtn");
const authMessage        = document.getElementById("authMessage");
const authSwitchBtn      = document.getElementById("authSwitchBtn");

let isSignUpMode = false;

// عناصر الوصفات والبحث والفرز
const searchInput         = document.getElementById("searchInput");
const categoryChips       = document.querySelectorAll(".category-chip");
const favoritesToggleBtn  = document.getElementById("favoritesToggle");
const sortSelect          = document.getElementById("sortSelect");
const recipesState        = document.getElementById("recipesState");
const recipesGrid         = document.getElementById("recipesGrid");
const recipeCardTemplate  = document.getElementById("recipeCardTemplate");
const resultsSummary      = document.getElementById("resultsSummary");
const favoritesCountBadge = document.getElementById("favoritesCount");

// عناصر Modal الوصفة
const recipeModal       = document.getElementById("recipeModal");
const modalCloseBtn     = document.getElementById("modalClose");
const modalImage        = document.getElementById("modalImage");
const modalTag          = document.getElementById("modalTag");
const modalTitle        = document.getElementById("modalTitle");
const modalTime         = document.getElementById("modalTime");
const modalCalories     = document.getElementById("modalCalories");
const modalProtein      = document.getElementById("modalProtein");
const modalIngredients  = document.getElementById("modalIngredients");
const modalSteps        = document.getElementById("modalSteps");

// ✅ إصلاح: هذا المتغير كان مفقوداً تماماً
const modalFavoriteBtn  = document.getElementById("modalFavoriteBtn");

// عناصر نافذة الحساب
const accountModal      = document.getElementById("accountModal");
const accountModalClose = document.getElementById("accountModalClose");
const accountPhoto      = document.getElementById("accountPhoto");
const accountName       = document.getElementById("accountName");
const accountEmail      = document.getElementById("accountEmail");
const accountNameForm   = document.getElementById("accountNameForm");
const accountNameInput  = document.getElementById("accountNameInput");
const accountMessage    = document.getElementById("accountMessage");
const accountLogoutBtn  = document.getElementById("accountLogoutBtn");

// عناصر تأكيد الخروج والبنود والخصوصية
const logoutConfirmModal = document.getElementById("logoutConfirmModal");
const confirmLogoutBtn   = document.getElementById("confirmLogoutBtn");
const cancelLogoutBtn    = document.getElementById("cancelLogoutBtn");
const termsModal         = document.getElementById("termsModal");
const termsModalClose    = document.getElementById("termsModalClose");
const privacyModal       = document.getElementById("privacyModal");
const privacyModalClose  = document.getElementById("privacyModalClose");
const footerTermsLink    = document.getElementById("footerTermsLink");
const footerPrivacyLink  = document.getElementById("footerPrivacyLink");

let currentUser = null;
/**
 * ==========================================================================
 * القسم 4: حالة التطبيق والتهيئة
 * ==========================================================================
 */
let state = {
  recipes: [],
  favorites: JSON.parse(localStorage.getItem("fyh_favorites")) || [],
  currentCategory: "all",
  searchQuery: "",
  sortBy: "newest",
  activeModalRecipeId: null
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupAuthListener();
  fetchRecipesFast();
  setupEventListeners();
  setupAccountAndLegalListeners();
  updateFavoritesCount();
});

// ✅ إصلاح: إنشاء دالة setupEventListeners المفقودة
function setupEventListeners() {
  if (authBtn) {
    authBtn.addEventListener("click", () => {
      if (currentUser) {
        openAccountModal();
      } else if (authModal) {
        authMessage.textContent = "";
        authMessage.className = "auth-message";
        authModal.showModal();
      }
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSearch(searchInput.value.trim());
    });
  }

  categoryChips.forEach(chip => {
    chip.addEventListener("click", () => {
      categoryChips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      state.currentCategory = chip.dataset.category || "all";
      if (favoritesToggleBtn) {
        favoritesToggleBtn.classList.remove("is-active");
      }
      renderRecipes();
    });
  });

  if (favoritesToggleBtn) {
    favoritesToggleBtn.addEventListener("click", () => {
      const isActive = favoritesToggleBtn.classList.toggle("is-active");
      if (isActive) {
        state.currentCategory = "favorites";
        categoryChips.forEach(c => c.classList.remove("is-active"));
      } else {
        state.currentCategory = "all";
        const allChip = document.querySelector('[data-category="all"]');
        if (allChip) allChip.classList.add("is-active");
      }
      renderRecipes();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      state.sortBy = sortSelect.value;
      renderRecipes();
    });
  }

  if (modalCloseBtn && recipeModal) {
    modalCloseBtn.addEventListener("click", () => recipeModal.close());
  }

  if (recipeModal) {
    recipeModal.addEventListener("click", (e) => {
      if (e.target === recipeModal) recipeModal.close();
    });
  }

  if (modalFavoriteBtn) {
    modalFavoriteBtn.addEventListener("click", () => {
      if (!state.activeModalRecipeId) return;
      toggleFavorite(state.activeModalRecipeId);
      const isFav = state.favorites.includes(state.activeModalRecipeId);
      updateModalFavoriteBtnState(isFav);
    });
  }

  if (authModalClose && authModal) {
    authModalClose.addEventListener("click", () => authModal.close());
  }

  if (authModal) {
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) authModal.close();
    });
  }

  setupAuthForms();
}
/**
 * ==========================================================================
 * القسم 5: نموذج تسجيل الدخول / إنشاء الحساب
 * ==========================================================================
 */
function setupAuthForms() {
  if (!authSwitchBtn || !authForm || !googleAuthBtn) return;

  // التبديل بين تسجيل الدخول وإنشاء حساب
  authSwitchBtn.addEventListener("click", () => {
    isSignUpMode = !isSignUpMode;
    if (authTitle) authTitle.textContent = isSignUpMode ? "إنشاء حساب جديد" : "مرحبًا بك";
    if (authDescription) {
      authDescription.textContent = isSignUpMode
        ? "أنشئ حسابًا لحفظ وصفاتك المفضلة."
        : "سجّل الدخول لحفظ وصفاتك المفضلة.";
    }
    if (authSubmitBtn) authSubmitBtn.textContent = isSignUpMode ? "إنشاء حساب" : "تسجيل الدخول";
    authSwitchBtn.textContent = isSignUpMode
      ? "لديك حساب؟ سجّل الدخول"
      : "ليس لديك حساب؟ أنشئ حسابًا جديدًا";
    if (authPassword) authPassword.autocomplete = isSignUpMode ? "new-password" : "current-password";
    if (authMessage) {
      authMessage.textContent = "";
      authMessage.className = "auth-message";
    }
  });

  // تسجيل الدخول / إنشاء حساب بالبريد وكلمة المرور
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) {
      showAuthMessage("يرجى ملء جميع الحقول.", "error");
      return;
    }

    authSubmitBtn.disabled = true;
    showAuthMessage("جاري المعالجة…", "info");

    try {
      if (isSignUpMode) {
        await auth.createUserWithEmailAndPassword(email, password);
      } else {
        await auth.signInWithEmailAndPassword(email, password);
      }
      authForm.reset();
      authMessage.textContent = "";
      authModal.close();
    } catch (err) {
      console.error("خطأ المصادقة:", err);
      showAuthMessage(authErrorText(err.code), "error");
    } finally {
      authSubmitBtn.disabled = false;
    }
  });

  // الدخول عبر Google
  googleAuthBtn.addEventListener("click", async () => {
    googleAuthBtn.disabled = true;
    try {
      await auth.signInWithPopup(googleProvider);
      authMessage.textContent = "";
      authModal.close();
    } catch (err) {
      console.error("خطأ Google:", err);
      showAuthMessage(authErrorText(err.code), "error");
    } finally {
      googleAuthBtn.disabled = false;
    }
  });
}

function showAuthMessage(text, type) {
  if (!authMessage) return;
  authMessage.textContent = text;
  authMessage.className = "auth-message" +
    (type === "error" ? " is-error" : type === "success" ? " is-success" : "");
}
/**
 * ==========================================================================
 * القسم 6: مستمع المصادقة
 * ==========================================================================
 */
function setupAuthListener() {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      currentUser = user;
      if (authBtn) {
        authBtn.innerHTML = user.photoURL
          ? `<img src="${user.photoURL}" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover;">`
          : `<i class="fa-solid fa-user-check"></i>`;
        authBtn.title = `مرحباً ${user.displayName || user.email} (اضغط لإعدادات الحساب)`;
      }
      await loadUserFavoritesFromCloud(user.uid);
    } else {
      currentUser = null;
      if (authBtn) {
        authBtn.innerHTML = `<i class="fa-solid fa-user"></i>`;
        authBtn.title = "تسجيل الدخول";
      }
      state.favorites = JSON.parse(localStorage.getItem("fyh_favorites")) || [];
      updateFavoritesCount();
      renderRecipes();
    }
  });
}
/**
 * ==========================================================================
 * القسم 7: إدارة المفضلة والمزامنة السحابية
 * ==========================================================================
 */
async function saveUserFavoritesToCloud() {
  if (!currentUser) return;
  try {
    await db.collection("users").doc(currentUser.uid).set({
      favorites: state.favorites,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.error("خطأ حفظ المفضلة على السحابة:", err);
  }
}

async function loadUserFavoritesFromCloud(uid) {
  try {
    const doc = await db.collection("users").doc(uid).get();
    if (doc.exists && doc.data().favorites) {
      state.favorites = doc.data().favorites;
      localStorage.setItem("fyh_favorites", JSON.stringify(state.favorites));
      updateFavoritesCount();
      renderRecipes();
    }
  } catch (err) {
    console.error("خطأ جلب البيانات السحابية:", err);
  }
}

function toggleFavorite(recipeId) {
  if (state.favorites.includes(recipeId)) {
    state.favorites = state.favorites.filter(id => id !== recipeId);
  } else {
    state.favorites.push(recipeId);
  }
  localStorage.setItem("fyh_favorites", JSON.stringify(state.favorites));
  updateFavoritesCount();
  renderRecipes();
  if (currentUser) {
    saveUserFavoritesToCloud();
  }
}
/**
 * ==========================================================================
 * القسم 8: دالة الترجمة
 * ==========================================================================
 */
async function translateText(text) {
  if (!text || text.trim() === "") return text;
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await res.json();
    if (data && data[0]) {
      return data[0].map(item => item[0]).join("");
    }
  } catch (err) {
    console.warn("خطأ ترجمة:", err);
  }
  return text;
}
/**
 * ==========================================================================
 * القسم 9: الجلب السريع للوصفات
 * ==========================================================================
 */
async function fetchRecipesFast() {
  if (recipesState) recipesState.style.display = "flex";
  if (recipesGrid) recipesGrid.innerHTML = "";

  const letters = ['c', 'b', 's', 'm'];
  let allMeals = [];

  try {
    const requests = letters.map(letter =>
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(res => res.ok ? res.json() : { meals: null })
        .catch(() => ({ meals: null }))
    );
    const results = await Promise.all(requests);

    results.forEach(data => {
      if (data && data.meals) {
        allMeals = [...allMeals, ...data.meals];
      }
    });

    if (allMeals.length > 0) {
      const formattedPromises = allMeals.map(async (meal, index) => {
        const translatedTitle = await translateText(meal.strMeal);
        let rawIngredients = [];
        for (let i = 1; i <= 20; i++) {
          const ing = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ing && ing.trim() !== "") {
            rawIngredients.push(`${ing.trim()} ${measure ? `(${measure.trim()})` : ""}`);
          }
        }
        const calculatedTime = 10 + (index % 6) * 5;
        const calculatedCalories = 180 + (index * 27) % 320;
        return {
          id: meal.idMeal,
          title: translatedTitle,
          originalTitle: meal.strMeal,
          category: mapCategoryToFilter(meal.strCategory, index),
          categoryLabel: mapCategoryLabel(meal.strCategory),
          time: `${calculatedTime} دقيقة`,
          timeMinutes: calculatedTime,
          calories: calculatedCalories,
          protein: `${18 + (index * 2) % 22}ج بروتين`,
          date: new Date(Date.now() - index * 86400000).toISOString(),
          image: meal.strMealThumb,
          rawIngredients: rawIngredients,
          rawSteps: meal.strInstructions
            ? meal.strInstructions.split(/\r?\n/).filter(s => s.trim().length > 3)
            : ["قم بتحضير المكونات الصحية واطهها حسب الرغبة."],
          translatedIngredients: null,
          translatedSteps: null
        };
      });

      state.recipes = await Promise.all(formattedPromises);
      if (recipesState) recipesState.style.display = "none";
      renderRecipes();
    } else {
      showErrorState("تعذر جلب الوصفات.");
    }
  } catch (error) {
    console.error("خطأ الجلب:", error);
    showErrorState("حدث خطأ أثناء تحميل البيانات.");
  }
}
/**
 * ==========================================================================
 * القسم 10: دوال تصنيف الفئات
 * ==========================================================================
 */

// ✅ إصلاح: إزالة المسافات الزائدة من المقارنات والقيم المعادة
function mapCategoryToFilter(apiCategory, index) {
  const cat = (apiCategory || "").toLowerCase();
  if (cat.includes("chicken") || cat.includes("beef") || cat.includes("seafood")) {
    return (index % 3 === 0) ? "keto" : "protein";
  }
  if (cat.includes("vegetarian") || cat.includes("vegan")) return "vegetarian";
  if (cat.includes("dessert")) return "dessert";
  return "diet";
}

// ✅ إصلاح: إزالة المسافات الزائدة من المفاتيح والقيم
function mapCategoryLabel(apiCategory) {
  const labels = {
    "Chicken": "عالي البروتين",
    "Beef": "عالي البروتين",
    "Seafood": "أطباق بحرية",
    "Vegetarian": "نباتي",
    "Vegan": "نباتي كلي",
    "Dessert": "حلويات صحية"
  };
  return labels[apiCategory] || "دايت متوازن";
}
/**
 * ==========================================================================
 * القسم 11: نافذة تفاصيل الوصفة
 * ==========================================================================
 */
async function openRecipeModal(recipe) {
  state.activeModalRecipeId = recipe.id;

  if (modalImage) {
    modalImage.src = recipe.image;
    modalImage.alt = recipe.title;
  }
  if (modalTag) modalTag.textContent = recipe.categoryLabel;
  if (modalTitle) modalTitle.textContent = recipe.title;
  if (modalTime) modalTime.textContent = recipe.time;
  if (modalCalories) modalCalories.textContent = `${recipe.calories} سعرة حرارية`;
  if (modalProtein) modalProtein.textContent = recipe.protein;
  if (modalIngredients) modalIngredients.innerHTML = "<li>جاري ترجمة المكونات...</li>";
  if (modalSteps) modalSteps.innerHTML = "<li>جاري ترجمة الخطوات...</li>";

  const isFav = state.favorites.includes(recipe.id);
  updateModalFavoriteBtnState(isFav);

  if (recipeModal) recipeModal.showModal();

  if (!recipe.translatedIngredients) {
    const ingPromises = recipe.rawIngredients.slice(0, 8).map(ing => translateText(ing));
    recipe.translatedIngredients = await Promise.all(ingPromises);
  }
  if (!recipe.translatedSteps) {
    const stepPromises = recipe.rawSteps.slice(0, 4).map(s => translateText(s));
    recipe.translatedSteps = await Promise.all(stepPromises);
  }

  if (modalIngredients) {
    modalIngredients.innerHTML = recipe.translatedIngredients
      .map(item => `<li>${item}</li>`).join("");
  }
  if (modalSteps) {
    modalSteps.innerHTML = recipe.translatedSteps
      .map(step => `<li>${step}</li>`).join("");
  }
}
/**
 * ==========================================================================
 * القسم 12: البحث في الوصفات
 * ==========================================================================
 */
async function handleSearch(query) {
  state.searchQuery = query.toLowerCase();

  if (!query) {
    renderRecipes();
    return;
  }

  let translatedQuery = arabicToEnglishMap[query.toLowerCase()];
  if (!translatedQuery) {
    for (let key in arabicToEnglishMap) {
      if (query.toLowerCase().includes(key)) {
        translatedQuery = arabicToEnglishMap[key];
        break;
      }
    }
  }

  if (translatedQuery) {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${translatedQuery}`);
      const data = await res.json();
      if (data.meals) {
        const newPromises = data.meals.map(async (meal, index) => {
          const titleAr = await translateText(meal.strMeal);
          return {
            id: meal.idMeal,
            title: titleAr,
            originalTitle: meal.strMeal,
            category: mapCategoryToFilter(meal.strCategory, index),
            categoryLabel: mapCategoryLabel(meal.strCategory),
            time: `${15 + index * 5} دقيقة`,
            timeMinutes: 15 + index * 5,
            calories: 200 + index * 20,
            protein: "20ج بروتين",
            date: new Date().toISOString(),
            image: meal.strMealThumb,
            rawIngredients: [meal.strIngredient1, meal.strIngredient2].filter(Boolean),
            rawSteps: [meal.strInstructions || "تابع الخطوات المصورة."],
            translatedIngredients: null,
            translatedSteps: null
          };
        });
        const newRecipes = await Promise.all(newPromises);
        newRecipes.forEach(nR => {
          if (!state.recipes.some(r => r.id === nR.id)) {
            state.recipes.push(nR);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  renderRecipes();
}
/**
 * ==========================================================================
 * القسم 13: عرض البطاقات والفلترة
 * ==========================================================================
 */
function renderRecipes() {
  let filtered = [...state.recipes];

  if (state.currentCategory === "favorites") {
    filtered = filtered.filter(r => state.favorites.includes(r.id));
  } else if (state.currentCategory !== "all") {
    filtered = filtered.filter(r => r.category === state.currentCategory);
  }

  if (state.searchQuery) {
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(state.searchQuery) ||
      r.originalTitle.toLowerCase().includes(state.searchQuery) ||
      r.categoryLabel.toLowerCase().includes(state.searchQuery)
    );
  }

  if (state.sortBy === "newest") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (state.sortBy === "calories") {
    filtered.sort((a, b) => a.calories - b.calories);
  } else if (state.sortBy === "time") {
    filtered.sort((a, b) => a.timeMinutes - b.timeMinutes);
  }

  if (resultsSummary) {
    resultsSummary.textContent = `تم العثور على ${filtered.length} وصفة`;
  }

  if (!recipesGrid) return;
  recipesGrid.innerHTML = "";

  if (filtered.length === 0) {
    const emptyMsg = state.currentCategory === "favorites"
      ? "لا توجد وصفات في المفضلة بعد."
      : `لا توجد وصفات مطابقة${state.searchQuery ? ` لـ "${state.searchQuery}"` : ""}.`;
    recipesGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: var(--text-muted);">
        <i class="fa-solid fa-utensils" style="font-size: 2.8rem; margin-bottom: 12px; display: block;"></i>
        <p>${emptyMsg}</p>
      </div>`;
    return;
  }

  // ✅ إصلاح: "recipe = >" كانت بمسافة خاطئة → "recipe =>"
  filtered.forEach(recipe => {
    const clone = recipeCardTemplate.content.cloneNode(true);
    const card = clone.querySelector(".recipe-card");
    const img = clone.querySelector(".recipe-img");
    const favBtn = clone.querySelector(".favorite-btn");
    const tag = clone.querySelector(".recipe-tag");
    const title = clone.querySelector(".recipe-title");
    const time = clone.querySelector(".recipe-time");
    const calories = clone.querySelector(".recipe-calories");

    if (img) {
      img.src = recipe.image;
      img.alt = recipe.title;
    }
    if (tag) tag.textContent = recipe.categoryLabel;
    if (title) title.textContent = recipe.title;
    if (time) time.textContent = recipe.time;
    if (calories) calories.textContent = `${recipe.calories} سعرة`;

    const isFav = state.favorites.includes(recipe.id);
    if (favBtn) {
      favBtn.setAttribute("aria-pressed", isFav ? "true" : "false");
      const icon = favBtn.querySelector("i");
      if (icon) {
        icon.className = isFav ? "fa-solid fa-heart" : "fa-regular fa-heart";
      }
      favBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(recipe.id);
      });
    }

    if (card) {
      card.addEventListener("click", () => openRecipeModal(recipe));
    }

    recipesGrid.appendChild(clone);
  });
}
/**
 * ==========================================================================
 * القسم 14: الأدوات المساعدة (الثيم والعداد)
 * ==========================================================================
 */
function initTheme() {
  const savedTheme = localStorage.getItem("fyh_theme");
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem("fyh_theme", newTheme);
}

function updateFavoritesCount() {
  if (!favoritesCountBadge) return;
  const count = state.favorites.length;
  favoritesCountBadge.textContent = count;
  if (count > 0) {
    favoritesCountBadge.removeAttribute("hidden");
  } else {
    favoritesCountBadge.setAttribute("hidden", "true");
  }
}

function updateModalFavoriteBtnState(isFav) {
  if (!modalFavoriteBtn) return;
  modalFavoriteBtn.setAttribute("aria-pressed", isFav ? "true" : "false");
  const span = modalFavoriteBtn.querySelector("span");
  if (span) {
    span.textContent = isFav ? "في المفضّلة" : "أضف إلى المفضّلة";
  }
  const icon = modalFavoriteBtn.querySelector("i");
  if (icon) {
    icon.className = isFav ? "fa-solid fa-heart" : "fa-regular fa-heart";
  }
}

// ✅ إصلاح: إغلاق القوس الناقص — كانت هذه الدالة غير مغلقة
function showErrorState(msg) {
  if (!recipesState) return;
  recipesState.style.display = "flex";
  recipesState.innerHTML = `
    <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.2rem; color: var(--accent);"></i>
    <p>${msg}</p>
    <button type="button" class="category-chip" onclick="fetchRecipesFast()">إعادة المحاولة</button>`;
}
/**
 * ==========================================================================
 * القسم 15: إدارة الحساب
 * ==========================================================================
 */

// ✅ إصلاح: كانت هذه الدالة معرّفة داخل showErrorState بالخطأ
function openAccountModal() {
  if (!currentUser || !accountModal) return;
  if (accountName) accountName.textContent = currentUser.displayName || "المستخدم";
  if (accountEmail) accountEmail.textContent = currentUser.email || "";
  if (accountPhoto) {
    if (currentUser.photoURL) {
      accountPhoto.src = currentUser.photoURL;
      accountPhoto.style.display = "block";
    } else {
      accountPhoto.style.display = "none";
    }
  }
  if (accountNameInput) accountNameInput.value = currentUser.displayName || "";
  if (accountMessage) {
    accountMessage.textContent = "";
    accountMessage.className = "auth-message";
  }
  accountModal.showModal();
}
/**
 * ==========================================================================
 * القسم 16: النوافذ القانونية والخروج
 * ==========================================================================
 */
function setupAccountAndLegalListeners() {

  // إغلاق نافذة الحساب
  if (accountModalClose && accountModal) {
    accountModalClose.addEventListener("click", () => accountModal.close());
  }
  if (accountModal) {
    accountModal.addEventListener("click", event => {
      if (event.target === accountModal) accountModal.close();
    });
  }

  // حفظ الاسم
  if (accountNameForm) {
    accountNameForm.addEventListener("submit", async event => {
      event.preventDefault();
      if (!currentUser) return;
      const newName = accountNameInput.value.trim();
      if (!newName) {
        accountMessage.textContent = "يرجى إدخال الاسم.";
        accountMessage.className = "auth-message error";
        return;
      }
      try {
        await currentUser.updateProfile({ displayName: newName });
        if (accountName) accountName.textContent = newName;
        accountMessage.textContent = "تم حفظ الاسم بنجاح.";
        accountMessage.className = "auth-message success";
        if (authBtn) {
          authBtn.title = `مرحباً ${newName} (اضغط لإعدادات الحساب)`;
        }
      } catch (error) {
        console.error("خطأ في تحديث الاسم:", error);
        accountMessage.textContent = "تعذر حفظ الاسم. حاول مرة أخرى.";
        accountMessage.className = "auth-message error";
      }
    });
  }

  // زر تسجيل الخروج من إعدادات الحساب → فتح نافذة التأكيد
  if (accountLogoutBtn && logoutConfirmModal) {
    accountLogoutBtn.addEventListener("click", () => {
      if (accountModal) accountModal.close();
      logoutConfirmModal.showModal();
    });
  }

  // إلغاء تسجيل الخروج
  if (cancelLogoutBtn && logoutConfirmModal) {
    cancelLogoutBtn.addEventListener("click", () => logoutConfirmModal.close());
  }

  // تأكيد تسجيل الخروج
  if (confirmLogoutBtn && logoutConfirmModal) {
    confirmLogoutBtn.addEventListener("click", async () => {
      try {
        await auth.signOut();
        logoutConfirmModal.close();
      } catch (error) {
        console.error("خطأ في تسجيل الخروج:", error);
        alert("تعذر تسجيل الخروج. تحقق من اتصال الإنترنت وحاول مجددًا.");
      }
    });
  }

  // إغلاق نافذة التأكيد بالنقر خارجها
  if (logoutConfirmModal) {
    logoutConfirmModal.addEventListener("click", event => {
      if (event.target === logoutConfirmModal) logoutConfirmModal.close();
    });
  }

  // إغلاق نوافذ البنود والخصوصية
  if (termsModalClose && termsModal) {
    termsModalClose.addEventListener("click", () => termsModal.close());
  }
  if (privacyModalClose && privacyModal) {
    privacyModalClose.addEventListener("click", () => privacyModal.close());
  }

  // فتح بنود الخدمة من التذييل
  if (footerTermsLink && termsModal) {
    footerTermsLink.addEventListener("click", event => {
      event.preventDefault();
      termsModal.showModal();
    });
  }

  // فتح سياسة الخصوصية من التذييل
  if (footerPrivacyLink && privacyModal) {
    footerPrivacyLink.addEventListener("click", event => {
      event.preventDefault();
      privacyModal.showModal();
    });
  }

  // إغلاق بنود الخدمة بالنقر خارجها
  if (termsModal) {
    termsModal.addEventListener("click", event => {
      if (event.target === termsModal) termsModal.close();
    });
  }

  // إغلاق سياسة الخصوصية بالنقر خارجها
  if (privacyModal) {
    privacyModal.addEventListener("click", event => {
      if (event.target === privacyModal) privacyModal.close();
    });
  }
}