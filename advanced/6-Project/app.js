var budgetController = (function () {

  var Expense = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
    this.percentage = -1
  }

  Expense.prototype.calcPercentage = function (totalIncome) {
    if(totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100)
    } else {
      this.percentage = -1
    }
  }

  Expense.prototype.getPercentage = function () {
    return this.percentage
  }

  var Income = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
    this.percentage = -1
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

    calculatePercentages: function () {
      data.allItems.exp.forEach(function(curr, index, arr) {
        curr.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPerc = data.allItems.exp.map(function (curr) {
        return curr.getPercentage();
      });
      return allPerc;
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
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  }

  var formatNumber = function(num, type) {
    var numSplit, int, dec;
    // + or - before number 
    // exactly 2 decimal points
    // comma separating the thousands
    // 2310.4567 -> + 2,310.46
    // 2000 -> + 2,000.00

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');
    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length); //input 2310, output 2,310
    }
    dec = numSplit[1];
    
    return (type === 'exp' ? '-' : '+') + ' ' + int + '.'+ dec;
  }

  var nodelistForEach = function (list, callback) {
    for(var i = 0; i<list.length; i++) {
      callback(list[i], i)
    }
  }


  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //either inc or exp,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    changeType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType + ',' +
        DOMstrings.inputDescription + ',' +
        DOMstrings.inputValue
      );

      nodelistForEach(fields, function (curr) {
        curr.classList.toggle('red-focus')  //toggle method add red-focus class if it doesn't exist and remove if exist
      })

      document.querySelector(DOMstrings.inputBtn).classList.toggle('red')
    },

    getDOMstrings: function () {
      return DOMstrings
    },

    displayBudget: function (budget) {
      var type = budget.budget > 0 ? 'enc' : 'exp'
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(budget.budget,type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(budget.totalInc, 'inc');
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(budget.totalExp,'exp');

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

    displayMonth: function () {
      var now, monthNames, year;
      now =  new Date();
      monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
        'December'
      ];
      month = now.getMonth();
      year = now.getFullYear();

      document.querySelector(DOMstrings.dateLabel).textContent = monthNames[month] + ' ' + year;
    },

    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
      nodelistForEach(fields, function(curr,index) {
        if(percentages[index] > 0) {  
          curr.textContent = percentages[index] + '%'
        } else {
          curr.textContent = '---'
        }
       
      })
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
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type))
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

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
  };

  var updatePercentages = function () {
    //calculate  percentages
    budgetCtrl.calculatePercentages();
    //read percentages from budget controller
    var percentages = budgetCtrl.getPercentages();
    //update the UI with the new percentages
    UICtrl.displayPercentages(percentages);
  }

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
      //update percentages
      updatePercentages();
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
      // 6 update percentages
      updatePercentages();
    }
  };

  return {
    init: function () {
      UICtrl.displayMonth();
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