var titleInput = document.querySelector('.title-input')
var priceInput = document.querySelector('.price-input')
var taxesInput = document.querySelector('.taxes-input')
var adsInput = document.querySelector('.ads-input')
var discountInput = document.querySelector('.discount-input')
var countInput = document.querySelector('.count-input')
var categoryInput = document.querySelector('.category-input')

var totalSpan = document.querySelector('.total-span')
var searchInput = document.querySelector('.search-input')
var table = document.querySelector('table')
var tableD = document.querySelector('.table-d')
var divCaredTable = document.querySelector('.div-cared-table')

var createSubmit = document.querySelector('.create-submit')
var searchByTitleSubmit = document.querySelector('.search-by-title-submit')
var searchByCategorySubmit = document.querySelector(
  '.search-by-category-submit',
)
var deleteSubmit = document.querySelector('.delete-submit')

// function take inputs value and put it in localStorage if its create or update mood
createSubmit.addEventListener('click', addInputsValue)

function addInputsValue(e) {
  e.preventDefault()
  if (localStorage.getItem('productss')) {
    var productsInLocal = JSON.parse(localStorage.getItem('productss'))
  } else {
    productsInLocal = []
  }
  if (titleInput.value && priceInput.value) {
    if (mood == 'create') {
      let product = {
        title: titleInput.value,
        price: priceInput.value,
        taxes: taxesInput.value,
        ads: adsInput.value,
        discount: discountInput.value,
        total: totalPrice,
        count: countInput.value,
        category: categoryInput.value,
      }
      totalSpan.innerHTML = ''
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          productsInLocal.push(product)
        }
      } else {
        productsInLocal.push(product)
      }
    } else {
      var itemUpdated = productsInLocal.find(
        (item, i, array) => item === array[idd],
      )
      itemUpdated.title = titleInput.value
      itemUpdated.price = priceInput.value
      itemUpdated.ads = adsInput.value
      itemUpdated.taxes = taxesInput.value
      itemUpdated.discount = discountInput.value
      itemUpdated.total = totalPrice
      itemUpdated.category = categoryInput.value
      mood = 'create'
    }
    localStorage.setItem('productss', JSON.stringify(productsInLocal))
    titleInput.value = ''
    priceInput.value = ''
    taxesInput.value = ''
    adsInput.value = ''
    discountInput.value = ''
    countInput.value = ''
    categoryInput.value = ''
    drawTable(JSON.parse(localStorage.getItem('productss')))
    lengthOfAllProducts()
    makeTotal()
  } else {
    alert('please put at least title and price ')
  }
  hideAndShow()
}

// put Total value in span and make total variable
priceInput.addEventListener('keyup', makeTotal)
taxesInput.addEventListener('keyup', makeTotal)
adsInput.addEventListener('keyup', makeTotal)
discountInput.addEventListener('keyup', makeTotal)
var totalPrice
function makeTotal() {
  var positivePrice = +priceInput.value + +taxesInput.value + +adsInput.value
  var negative = discountInput.value
  totalPrice = positivePrice - +negative
  if (
    priceInput.value != '' ||
    taxesInput.value != '' ||
    adsInput.value !== '' ||
    discountInput !== ''
  ) {
    totalSpan.style.backgroundColor = 'red'
    totalSpan.innerHTML = 'total:' + totalPrice
  } else {
    totalSpan.style.backgroundColor = '#000'
    totalSpan.innerHTML = 'total:'
  }
}
// function build table UI

function drawTable(item) {
  tableDrawed = item.map((item, i) => {
    return ` <tr> 
        <td class="one-column">${i + 1}</td>
        <td class="two-column">${item.title}</td>
        <td class="third-column">${item.price}</td>
        <td class="fourth-column">${item.taxes}</td>
        <td class="fifth-column">${item.ads}</td>
        <td class="six-column">${item.discount}</td>
        <td class="seven-column">${item.total}</td>
        <td class="eight-column">${item.category}</td>
        <td class="nine-column">${
          '<input class="update-input" type="submit" value="update" onclick="updateItem( ' +
          i +
          ' )"></input>'
        }</td>
        <td class="ten-column">${
          '<input class="delete-input" type="submit" value="delete" onclick="deleteItem( ' +
          i +
          ' )"></input>'
        }</td>
        </tr>
      
      `
  })

  tableD.innerHTML = tableDrawed.join('')
}

// hide and show div cared table
function hideAndShow() {
  let productsInLocal
  if (JSON.parse(localStorage.getItem('productss')) && productsInLocal != '') {
    let productsInLocal = JSON.parse(localStorage.getItem('productss'))
    divCaredTable.style.display = 'block'
    drawTable(JSON.parse(localStorage.getItem('productss')))
  } else {
    divCaredTable.style.display = 'none'
  }
}
hideAndShow()
// function delete item
function deleteItem(id) {
  let productsInLocal = JSON.parse(localStorage.getItem('productss'))
  var itemDeleted = productsInLocal.filter(
    (item, i, array) => item !== array[id],
  )
  localStorage.setItem('productss', JSON.stringify(itemDeleted))
  drawTable(itemDeleted)
  lengthOfAllProducts()
  hideAndShow()
}
// delete all item from localStorage and UI
deleteSubmit.addEventListener('click', deleteAllProduct)
function deleteAllProduct() {
  hideAndShow()

  var confirmResponse = window.confirm(
    'Are You Sure That You Want Delete All Products',
  )
  if (confirmResponse == true) {
    localStorage.removeItem('productss')
  }
}
// function put length into input delete All's value
function lengthOfAllProducts() {
  let productsInLocal = JSON.parse(localStorage.getItem('productss'))
  if (JSON.parse(localStorage.getItem('productss')) && productsInLocal != '') {
    deleteSubmit.value = 'delete All  (' + productsInLocal.length + ')'
  } else {
    deleteSubmit.value = 'delete All '
  }
}
lengthOfAllProducts()
// know what button I clicked search by title or by category
var checkTitleOrCategory = 'title'
searchByCategorySubmit.addEventListener('click', putCategoryWord)
searchByTitleSubmit.addEventListener('click', putTitleWord)
function putCategoryWord(e) {
  e.preventDefault()
  checkTitleOrCategory = 'category'
  putTitleWordInBeginning()
}
function putTitleWord(e) {
  e.preventDefault()
  checkTitleOrCategory = 'title'
  putTitleWordInBeginning()
}
function putTitleWordInBeginning() {
  if (checkTitleOrCategory == 'category') {
    checkTitleOrCategory = 'category'
  } else {
    checkTitleOrCategory = 'title'
  }
}
putTitleWordInBeginning()
// function search by title and category
searchInput.addEventListener('keyup', takeTitleValueInInput)
function searchByWhatNeededInput(value) {
  if (checkTitleOrCategory === 'category') {
    let productsInLocal = JSON.parse(localStorage.getItem('productss'))
    productsSearchedByTitle = productsInLocal.filter(
      (item) => item.category.toLowerCase().indexOf(value.toLowerCase()) !== -1,
    )
    drawTable(productsSearchedByTitle)
  } else {
    let productsInLocal = JSON.parse(localStorage.getItem('productss'))
    productsSearchedByTitle = productsInLocal.filter(
      (item) => item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1,
    )
    drawTable(productsSearchedByTitle)
  }
}
function takeTitleValueInInput(e) {
  e.preventDefault()
  var value = e.target.value
  searchByWhatNeededInput(value)
}

// function update item if i need to change any value
var mood = 'create'
var idd
function updateItem(id) {
  let productsInLocal = JSON.parse(localStorage.getItem('productss'))
  //   var itemUpdated = productsInLocal[id]
  var itemUpdated = productsInLocal.find((item, i, array) => item === array[id])
  titleInput.value = itemUpdated.title
  priceInput.value = itemUpdated.price
  adsInput.value = itemUpdated.ads
  taxesInput.value = itemUpdated.taxes
  discountInput.value = itemUpdated.discount
  categoryInput.value = itemUpdated.category
  mood = 'update'
  idd = id
}
