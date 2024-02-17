

function calculateDiminishingAmount(input_1,interest) {
  let currentAmount = input_1;
  let currentYear = new Date().getFullYear();
  let diminishingAmounts=[{currentYear: currentAmount}];
  while (currentAmount > 1500) {
      let nextAmount = currentAmount - (currentAmount * (interest / 100));
      let obj = {};
      obj[++currentYear] = +nextAmount.toFixed(2);
      diminishingAmounts.push(obj);
      currentAmount = +nextAmount.toFixed(2);
      
  }

  return diminishingAmounts;
}

function calculateInflation(  input_1,
  constant,
  input_2){
    let years = constant / input_2;
    let wholeYears = Math.floor(years);
    let remainingMonths = (years - wholeYears) * 12;
    let wholeMonths = Math.floor(remainingMonths);
    let remainingDays = (remainingMonths - wholeMonths) * 30;
    let wholeDays = Math.floor(remainingDays);
    let amount2 = 0.5*input_1
    let amount = +(amount2/years).toFixed(2)
    let temp = amount2;
    let inflationAmount = [];
  let currentYear = new Date().getFullYear()+Math.ceil(years);
  let obj= {};
   
  obj[currentYear] = amount2;
  inflationAmount[inflationAmount.length] =obj

  for (let j = 1; j <= wholeYears; j++) {
    let obj = {};
   
    obj[--currentYear] = +(temp+amount).toFixed(2);
    inflationAmount.push(obj);
    temp=temp+amount;
  }
  inflationAmount = inflationAmount.reverse();
  
  return {
    wholeYears,
    wholeMonths,
    wholeDays,
    inflationAmount,
  };
    


}
function calculateInterestRate(amount2, input_1, year) {
  const rate = Math.pow(amount2 / input_1, 1 / year) - 1;
  return +rate.toFixed(5); // Adjust the precision as needed
}



function calculateYears(
  rule_id,
  input_1,
  constant,
  input_2
) {
  let i;
  if(rule_id==6){
    i=2;
  }
  else if(rule_id==7){
    i=3;
  }
  else{
    i=4;
  }
  let years = constant / input_2;
  let wholeYears = Math.floor(years);
  let remainingMonths = (years - wholeYears) * 12;
  let wholeMonths = Math.floor(remainingMonths);
  let remainingDays = (remainingMonths - wholeMonths) * 30;
  let wholeDays = Math.floor(remainingDays);
  let amount2 = i*input_1;

  let increasingAmount = [];
  let currentYear = new Date().getFullYear();
  
  for (let j = 1; j <= wholeYears; j++) {
    let obj = {};
    const rate = calculateInterestRate(amount2,input_1,years);
    const compoundInterest = input_1 * Math.pow(1 + rate, j);
    const amountAtYear = +compoundInterest.toFixed(2); // Rounded to 2 decimal places
    obj[++currentYear] = amountAtYear;
    increasingAmount.push(obj);
  }
  if (years - wholeYears > 0) {
    let obj={
    }
    obj[++currentYear]=amount2
    increasingAmount.push(obj)
  
  }
  let obj={
  }
  obj[currentYear]=amount2
  increasingAmount[increasingAmount.length-1] =obj
  
  return {
    wholeYears,
    wholeMonths,
    wholeDays,
    increasingAmount,
  };
}

function resultConverter(
  rule_id,
  input_1,
  constant,
  input_2
) {

  try {
    if ((rule_id==6 || rule_id==7 ||rule_id==8) && input_1 !== undefined && input_2 !== undefined) {
      const { increasingAmount, wholeDays, wholeMonths, wholeYears } =
        calculateYears(rule_id, input_1, constant, input_2);
      return {
        ruleId: rule_id,
        input:{
          investment: input_1,
          rateOfInterest: input_2,

        },
        yearlyAmount: increasingAmount,
        result: {
          
          years: wholeYears,
          months: wholeMonths,
          days: wholeDays,
          
        },
      };
    } else if (rule_id == 9 && input_1 !== undefined && input_2 !== undefined) {
      const { inflationAmount, wholeDays, wholeMonths, wholeYears } =
        calculateInflation( input_1, constant, input_2);
      return {
        ruleId: rule_id,
        input:{
          investment: input_1,
          inflationRate: input_2,

        },
        yearlyAmount: inflationAmount,
        result: {
          
          years: wholeYears,
          months: wholeMonths,
          days: wholeDays,
          
        },
      };
    }

    if (rule_id === 1) {
      return {
        ruleId: rule_id,
        input:{
          salary:input_1
        },
        result: {
          
          need: Math.floor((50 / 100) * (input_1 || 0)),
          want: Math.floor((30 / 100) * (input_1 || 0)),
          saving: Math.floor((20 / 100) * (input_1 || 0)),
        },
      };
    }
    if (rule_id === 2) {
      const amount = 3 * (input_2 || 0);
      let status;
      if (amount <= input_1) {
        return {
          ruleId: rule_id,
          status: true,
          input:{
            salary: input_2,
            emergencyFund: input_1,

          },
          result: {
            
            excess: input_1 - amount,
            verdict: `fund is sufficient`,
          },
        };
      }
      return {
        ruleId: rule_id,
        status: false,
        input:{
          salary: input_2,
          emergencyFund: input_1,
        },
        result: {
          
          shortage: amount - input_1,
          verdict: `fund is not sufficient`,
        },
      };
    }
    if (rule_id === 3) {
      const amount = (40 / 100) * (input_1 || 0);
      const percentage = (input_2 / input_1) * 100;
      if (percentage <= 40) {
        return {
          status: true,
          ruleId: rule_id,
          input:{
            salary: input_1,
            emiAmount: input_2,
          },
          result: {
            
            percentage:Math.floor(percentage),
            excess: amount - input_2,
            verdict: "safe",
          },
        };
      }
      return {
        status: false,
        ruleId: rule_id,
        input:{
          salary: input_1,
          emiAmount: input_2,
        },
        result: {
          
          percentage:Math.floor(percentage),
          shortage: input_2 - amount,
          verdict: "not safe",
        },
      };
    }
    if (rule_id === 4) {
      const amount = 20 * input_2;
      if (amount <= input_1) {
        return {
          status: true,
          ruleId: rule_id,
          input:{
            annualIncome: input_2,
            lifeInsurance: input_1,

          },
          result: {
            
            excess: input_1-amount,
            verdict: "safe",
          },
        };
      }
      return {
        status: false,
        ruleId: rule_id,
        input:{
          annualIncome: input_2,
          lifeInsurance: input_1,
        },
        result: {
          
          shortage: amount-input_1,
          verdict: " not safe",
        },
      };
    }
    if (rule_id === 10) {
      let percentage = +((input_2 / input_1) * 100).toFixed(2);
      if (percentage >= 10) {
        return {
          ruleId: rule_id,
          status: true,
          input:{
            costOfItem: input_1,
            estimatedUsage: input_2,
          },
          result: {
            
            percentage,
            verdict: "Worth buying",
          },
        };
      }
      return {
        ruleId: rule_id,
        status: false,
        input:{
          costOfItem: input_1,
          estimatedUsage: input_2,
        },
        result: {
          
          percentage,
          verdict: "not Worth buying",
        },
      };
    }

    if (rule_id === 5) {
      const diminishingAmounts = calculateDiminishingAmount(input_1,4)
      return {
        ruleId:rule_id,
        yearlyAmount:diminishingAmounts,
        result:{
          rate:"4%",
          retirementFund:input_1,          
          years:diminishingAmounts.length,
          
        }
      };
    }
  } catch (error) {
    throw new Error(`invalid rule_id : ${rule_id}`);
  }
}

export { resultConverter };
