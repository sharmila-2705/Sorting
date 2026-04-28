let arr=[45,20,70,12,90,33];
let steps=[];
let currentStep=0;
let playing=false;
let timer;

function renderArray(step=arr){
const container=document.getElementById('array-container');
container.innerHTML='';

step.forEach(obj=>{
let bar=document.createElement('div');
bar.classList.add('bar');
if(obj.state) bar.classList.add(obj.state);
bar.style.height=obj.value*3+'px';
bar.innerHTML=`<span>${obj.value}</span>`;
container.appendChild(bar);
});
}

function snapshot(array,highlight=[]){
steps.push(
array.map((v,i)=>({
value:v,
state:
highlight.includes(i)
? 'selected'
: ''
}))
);
}

function generateRandom(){
arr=[];
for(let i=0;i<8;i++)
arr.push(Math.floor(Math.random()*90)+10);
renderArray(
arr.map(v=>({value:v}))
);
}

function setManualArray(){
let input=document
.getElementById('manualInput')
.value.split(',')
.map(Number);
arr=input;
renderArray(arr.map(v=>({value:v})));
}

function startSort(type){
steps=[];
currentStep=0;
let copy=[...arr];

if(type==='bubble')bubble(copy);
if(type==='selection')selection(copy);
if(type==='insertion')insertion(copy);

renderArray(steps[0]);
}

function bubble(a){
for(let i=0;i<a.length;i++)
for(let j=0;j<a.length-i-1;j++){
snapshot(a,[j,j+1]);
if(a[j]>a[j+1])
[a[j],a[j+1]]=[a[j+1],a[j]];
snapshot(a,[j,j+1]);
}
}

function selection(a){
for(let i=0;i<a.length;i++){
let min=i;
for(let j=i+1;j<a.length;j++){
snapshot(a,[min,j]);
if(a[j]<a[min])
min=j;
}
[a[i],a[min]]=[a[min],a[i]];
snapshot(a,[i,min]);
}
}

function insertion(a){
for(let i=1;i<a.length;i++){
let key=a[i];
let j=i-1;
while(j>=0&&a[j]>key){
a[j+1]=a[j];
snapshot(a,[j,j+1]);
j--;
}
a[j+1]=key;
snapshot(a,[j+1]);
}
}

function nextStep(){
if(currentStep<steps.length-1){
currentStep++;
renderArray(steps[currentStep]);
}
}

function prevStep(){
if(currentStep>0){
currentStep--;
renderArray(steps[currentStep]);
}
}

function toggleAnimation(){
if(!playing){
playing=true;
play();
}
else{
playing=false;
clearTimeout(timer);
}
}

function play(){
if(!playing||currentStep>=steps.length-1)
return;
nextStep();
let speed=
document.getElementById('speedSlider').value;

timer=setTimeout(play,speed);
}

renderArray(arr.map(v=>({value:v})));
