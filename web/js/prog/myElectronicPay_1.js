var payJson = modal.myElectronicPay();  
console.debug(payJson);

var ibonJson = modal.myIbon();  
console.debug(ibonJson);

var nameJson = payJson.name;
var paymentDateJson = payJson.payment_date;
var balanceJson = payJson.balance;
var overdueDateJson = payJson.overdue_date;
var paymentJson = payJson.payment;
var deadlineJson = payJson.deadline;
var detailsJson = payJson.details;
var sumJson = payJson.sum;

var loanName = $('#name');     //借款人名字
var paymentDate = $('#paymentDate');      //繳款單年月    
var balance = $('#balance');       //就學貸款餘額
var overdueDate = $('#overdueDate');    //利息/違約金/逾期息計算迄日
var payment = $('#payment');    //本期應繳總金額
var deadline = $('#deadline');    //還款期限
var sum = $('#sum');    //本期應繳總金額

var accountLi = $('#accountLi');
var principalLi = $('#principalLi');
var interestLi = $('#interestLi');
var penaltyLi = $('#penaltyLi');
var paymentLi = $('#paymentLi');
var resa = $('.resa');
var accountArr = [];
var interestArr = [];
var paymentArr = [];
var penaltyArr = [];
var principalArr = [];

//var ibonArea = $('.ibonArea');   

loanName.text(nameJson);
paymentDate.text(paymentDateJson);
balance.text(balanceJson);
overdueDate.text(overdueDateJson);
payment.text(paymentJson);
deadline.text(deadlineJson);

//顯示"本期應繳還款明細"

accountArr.push('<h4>繳款帳號</h4>');
principalArr.push('<h4>應繳本金</h4>');
interestArr.push('<h4>應繳利息</h4>');
penaltyArr.push('<h4>違約金/逾期息</h4>');
paymentArr.push('<h4>應繳金額</h4>');

console.debug(detailsJson);
$.each(detailsJson, function(i, detail) {
    accountArr.push('<h5>' + detail.account + '</h5>');
	principalArr.push('<h5>' + detail.principal + '</h5>');
    interestArr.push('<h5>' + detail.interest + '</h5>');
	penaltyArr.push('<h5>' + detail.penalty + '</h5>');
    paymentArr.push('<h5>' + detail.payment + '</h5>');
});

accountLi.empty();
principalLi.empty();
interestLi.empty();
penaltyLi.empty();
paymentLi.empty();

accountLi.append(accountArr.join('')); 
principalLi.append(principalArr.join('')); 
interestLi.append(interestArr.join('')); 
penaltyLi.append(penaltyArr.join('')); 
paymentLi.append(paymentArr.join(''));  

sum.text(sumJson);

//ibonArea.append(ibonJson);     
