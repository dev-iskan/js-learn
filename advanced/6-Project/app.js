var budgetController = (function () {

  var Expense = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var Income = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      //Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id;
      } else {
        ID = 0;
      }
      //Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val)
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val)
      }

      //Push it into our data structure
      data.allItems[type].push(newItem);

      // return item
      return newItem;
    },
    testing: function () {
      console.log(data);
    }
  }
})();


var UIController = (function () {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //either inc or exp,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    getDOMstrings: function () {
      return DOMstrings
    },

    clearFields: function () {
      var fields, fieldsArr;
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); //returns list which need to convert
  
      fieldsArr = Array.prototype.slice.call(fields); // by this construction we create new array from list
      //we call slice method in array prototype and by call method we pass fields as this method

      fieldsArr.forEach(function (current, index, array) {
        current.value = "";
      });
      fieldsArr[0].focus()
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      // Create html string with placeholder text
      if(type === 'inc'){
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      // Replace holder text with actual data
      newHtml = html.replace('%id%', obj.id)
      newHtml = newHtml.replace('%description%', obj.description)
      newHtml = newHtml.replace('%value%', obj.value)
      // Insert html into dom
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
    }
  }
})();


var controller = (function (budgetCtrl, UICtrl) {

  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function (event) {
      if (event.keyCode == 13 || event.which === 13) {
        ctrlAddItem()
      }
    })
  };

  var updateBudget = function () {
    //1 Calculate the budget
    //2 return the budget
    //3 display budget on the UI
  }

  var ctrlAddItem = function () {
    // 1 get input field
    var input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2 add item to budgetController
      var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3 add new item to UIcontroller
      UICtrl.addListItem(newItem, input.type);
      // 4 clear fields
      UICtrl.clearFields();
      // 5 calculate and update budget
      updateBudget();
      // 6 display budget
    }
  };

  return {
    init: function () {
      setupEventListeners();
    }
  }

})(budgetController, UIController);


controller.init()