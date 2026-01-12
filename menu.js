// --- Глобальные переменные ---
let order = [];          // Тапсырыс массиві
let total = 0;           // Жалпы сумма
let currentFood = {      // Ағымдағы тағам (order модаль үшін)
  name: '',
  price: 0
};
  

    /*жылдам ыздеу */

function filterMenu() {
  const selected = document.getElementById('categorySelect').value;
  const sections = document.querySelectorAll('.menu');

  sections.forEach(section => {
    const sectionCategory = section.dataset.section;

    if (selected === 'all' || sectionCategory === selected) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}


/* -------------------------
   INFO MODAL
------------------------- */
function openInfoModal(name, desc, img) {
  document.getElementById('infoTitle').innerText = name;
  document.getElementById('infoDesc').innerText = desc;
  document.getElementById('infoImg').src = img;
  document.getElementById('infoModal').style.display = 'block';
}

/* -------------------------
   ORDER MODAL
------------------------- */
function openOrderModal(name, price) {
  currentFood.name = name;
  currentFood.price = price;

  document.getElementById('orderTitle').innerText = name;
  document.getElementById('orderQty').value = 1;
  document.getElementById('orderType').selectedIndex = 0;
  document.getElementById('orderSpicy').selectedIndex = 0;

  document.getElementById('orderModal').style.display = 'block';
}

/* -------------------------
   ADD ORDER ITEM
------------------------- */
function addOrderItem() {
  const qty = parseInt(document.getElementById('orderQty').value);
  const type = document.getElementById('orderType').value;
  const spicy = document.getElementById('orderSpicy').value;

  if(qty < 1) { alert("Саны дұрыс енгізіңіз!"); return; }

  // Тапсырыс объект ретінде сақталады
  const item = {
    name: currentFood.name,
    price: currentFood.price,
    qty: qty,
    type: type,
    spicy: spicy
  };

  order.push(item);
  total += currentFood.price * qty;

  // Жаңарту экранға
  updateOrderSummary();

  // Модаль жабу
  closeModal('orderModal');
}

/* -------------------------
   UPDATE ORDER SUMMARY
------------------------- */
function updateOrderSummary() {
  if(order.length === 0) {
    document.getElementById('orderList').innerText = "Тағамдар: жоқ";
    document.getElementById('total').innerText = "Жалпы: 0 ₸";
    return;
  }

  let list = order.map(i => `${i.name} (${i.type}, ${i.spicy}) x${i.qty}`).join(", ");
  document.getElementById('orderList').innerText = "Тағамдар: " + list;
  document.getElementById('total').innerText = "Жалпы: " + total + " ₸";
}

/* -------------------------
   CLOSE MODAL
------------------------- */
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

/* -------------------------
   SEND ORDER (WhatsApp)
------------------------- */
function sendOrder() {
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.querySelector('input[name="pay"]:checked').value;

  if(!phone || !address || order.length === 0){
    alert("Барлық мәліметті толтырыңыз!");
    return;
  }

  // WhatsApp хабарлама мәтіні
  let items = order.map(i => `${i.name} (${i.type}, ${i.spicy}) x${i.qty}`).join("\n");

  const message = `🇰🇷 KOREAN CAFE
📞 Телефон: ${phone}
📍 Адрес: ${address}
💳 Төлем: ${payment}
🍜 Тағамдар:
${items}
💰 Жалпы: ${total} ₸`;

  // WhatsApp сілтемесі (мысалы +77001234567 орнына өз нөміріңіз)
  const url = `https://wa.me/77785271719?text=${encodeURIComponent(message)}`;
  window.open(url,'_blank');
}

/* -------------------------
   CLOSE MODAL ON OUTSIDE CLICK
------------------------- */
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if(event.target === modal) {
      modal.style.display = 'none';
    }
  });
}



function toggleBurger() {
  document.getElementById('burgerMenu').classList.toggle('active');
  document.getElementById('burgerOverlay').style.display = 'block';
}

function closeBurger() {
  document.getElementById('burgerMenu').classList.remove('active');
  document.getElementById('burgerOverlay').style.display = 'none';
}
