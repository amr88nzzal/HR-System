'use strict';
let empFormEl=document.getElementById('empForm');
let allEmp=[];
let tblHeader=['Name','Email','Department','Salary'];
let empTable=document.getElementById('empTable');
let totalSalary=0;

function addTblHeader(){
  let tblHeaderRow=document.createElement('tr');
  for(let i=0;i<tblHeader.length;i++){
    let empNameTh=document.createElement('th');
    empNameTh.textContent=tblHeader[i];
    tblHeaderRow.appendChild(empNameTh);
  }
  empTable.appendChild(tblHeaderRow);

}
function randomSalary(){
  return Math.floor((Math.random()*(500-100))+100);
}
function loadEmp(){
  let empFromLS=JSON.parse(localStorage.getItem('Employee'));
  if(empFromLS!==null){
    for(let i=0;i<empFromLS.length;i++){
      new Employee(empFromLS[i].empName,empFromLS[i].empEmail,empFromLS[i].empDep,empFromLS[i].empSalary);
      totalSalary+=empFromLS[i].empSalary;
      let totalSalaryEl=document.getElementById('totalSalary');
      totalSalaryEl.textContent=`Total = ${totalSalary}`;
    }
  }
}
function Employee (empName,empEmail,empDep,empSalary){
  this.empName=empName;
  this.empEmail=empEmail;
  this.empDep=empDep;
  this.empSalary=empSalary;
  allEmp.push(this);
  this.renderNewEmp();
}

Employee.prototype.renderNewEmp = function(){
  let empRow=document.createElement('tr');
  let empNameEl=document.createElement('td');
  let empEmailEl=document.createElement('td');
  let empDepEl=document.createElement('td');
  let empSalary=document.createElement('td');
  empNameEl.textContent=this.empName;
  empEmailEl.textContent=this.empEmail;
  empDepEl.textContent=this.empDep;
  empSalary.textContent=this.empSalary;
  empRow.appendChild(empNameEl);
  empRow.appendChild(empEmailEl);
  empRow.appendChild(empDepEl);
  empRow.appendChild(empSalary);
  empTable.appendChild(empRow);
};

empFormEl.addEventListener('submit',addNewEmp);
function addNewEmp (event){
  event.preventDefault();
  let empName=event.target.empName.value;
  let empEmail=event.target.empEmail.value;
  let empDep=event.target.empDep.value;
  let randEmpSalary=randomSalary();
  let newEmp =new Employee(empName,empEmail,empDep,randEmpSalary);
  let totalSalaryEl=document.getElementById('totalSalary');
  totalSalary+=randEmpSalary;
  totalSalaryEl.textContent=`Total = ${totalSalary}`;
  localStorage.setItem('Employee',JSON.stringify(allEmp));
  event.target.reset();
}
addTblHeader();
loadEmp();
