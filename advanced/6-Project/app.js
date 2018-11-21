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
    },
    budget: 0,
    percentage: -1 //-1 means not exists
  } 

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (curr, i, arr) {
      sum += curr.value;
    });
    data.totals[type] = sum;
  }

  return {
    deleteItem: function (type, id) {
      var ids, index;
      
      ids = data.allItems[type].map(function (curr, index, arr) {
        return curr.id
      });

      index = ids.indexOf(id); //return index  number of element with id in arr, if not found -1

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }

    },

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

    calculateBudget: function () {
      //calculate total inc and exp
      calculateTotal('exp');
      calculateTotal('inc');
      //calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp
      //calculate the percentage of income that was spent
      if(data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    testing: function () {
      console.log(data);
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
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
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    percentageLabel: '.budget__expenses--percentage',
    expensesLabel: '.budget__expenses--value',
    container: '.container'
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

    displayBudget: function (budget) {
      document.querySelector(DOMstrings.budgetLabel).textContent = budget.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = budget.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = budget.totalExp;

      if(budget.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = budget.percentage + '%'
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
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

    deleteListItem: function (selectorId) {
      var el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      // Create html string with placeholder text
      if(type === 'inc'){
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  var updateBudget = function () {
    //1 Calculate the budget
    budgetCtrl.calculateBudget();
    //2 return the budget
    var budget = budgetCtrl.getBudget();
    //3 display budget on the UI
    UICtrl.displayBudget(budget);
  }

  var ctrlDeleteItem = function (event) {
    var itemId, splitId;
    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemId) {
      //inc-1
      splitId = itemId.split('-');
      type = splitId[0];
      id = parseInt(splitId[1]);

      //delete item from data structure
      budgetCtrl.deleteItem(type, id);
      //delete from UI
      UICtrl.deleteListItem(itemId)
      //Update new totals of budget
      updateBudget();
    }
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
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  }

})(budgetController, UIController);


controller.init()