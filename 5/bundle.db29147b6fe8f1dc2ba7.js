(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,i="millisecond",n="second",s="minute",r="hour",a="day",l="week",o="month",u="quarter",c="year",d="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},m=function(e,t,i){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(i)+e},_={s:m,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),n=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+m(n,2,"0")+":"+m(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var n=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(n,o),r=i-s<0,a=t.clone().add(n+(r?-1:1),o);return+(-(n+(i-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:c,w:l,d:a,D:d,h:r,m:s,s:n,ms:i,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},g="en",y={};y[g]=v;var $=function(e){return e instanceof w},b=function e(t,i,n){var s;if(!t)return g;if("string"==typeof t){var r=t.toLowerCase();y[r]&&(s=r),i&&(y[r]=i,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;y[l]=t,s=l}return!n&&s&&(g=s),s||!n&&g},D=function(e,t){if($(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new w(i)},M=_;M.l=b,M.i=$,M.w=function(e,t){return D(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function v(e){this.$L=b(e.locale,null,!0),this.parse(e)}var m=v.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(p);if(n){var s=n[2]-1||0,r=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(e,t){var i=D(e);return this.startOf(t)<=i&&i<=this.endOf(t)},m.isAfter=function(e,t){return D(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<D(e)},m.$g=function(e,t,i){return M.u(e)?this[t]:this.set(i,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var i=this,u=!!M.u(t)||t,f=M.p(e),p=function(e,t){var n=M.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return u?n:n.endOf(a)},h=function(e,t){return M.w(i.toDate()[e].apply(i.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},v=this.$W,m=this.$M,_=this.$D,g="set"+(this.$u?"UTC":"");switch(f){case c:return u?p(1,0):p(31,11);case o:return u?p(1,m):p(0,m+1);case l:var y=this.$locale().weekStart||0,$=(v<y?v+7:v)-y;return p(u?_-$:_+(6-$),m);case a:case d:return h(g+"Hours",0);case r:return h(g+"Minutes",1);case s:return h(g+"Seconds",2);case n:return h(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var l,u=M.p(e),f="set"+(this.$u?"UTC":""),p=(l={},l[a]=f+"Date",l[d]=f+"Date",l[o]=f+"Month",l[c]=f+"FullYear",l[r]=f+"Hours",l[s]=f+"Minutes",l[n]=f+"Seconds",l[i]=f+"Milliseconds",l)[u],h=u===a?this.$D+(t-this.$W):t;if(u===o||u===c){var v=this.clone().set(d,1);v.$d[p](h),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[M.p(e)]()},m.add=function(i,u){var d,f=this;i=Number(i);var p=M.p(u),h=function(e){var t=D(f);return M.w(t.date(t.date()+Math.round(e*i)),f)};if(p===o)return this.set(o,this.$M+i);if(p===c)return this.set(c,this.$y+i);if(p===a)return h(1);if(p===l)return h(7);var v=(d={},d[s]=e,d[r]=t,d[n]=1e3,d)[p]||1,m=this.$d.getTime()+i*v;return M.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||f;var n=e||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),r=this.$H,a=this.$m,l=this.$M,o=i.weekdays,u=i.months,c=function(e,i,s,r){return e&&(e[i]||e(t,n))||s[i].slice(0,r)},d=function(e){return M.s(r%12||12,e,"0")},p=i.meridiem||function(e,t,i){var n=e<12?"AM":"PM";return i?n.toLowerCase():n},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:M.s(l+1,2,"0"),MMM:c(i.monthsShort,l,u,3),MMMM:c(u,l),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,o,2),ddd:c(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:M.s(r,2,"0"),h:d(1),hh:d(2),a:p(r,a,!0),A:p(r,a,!1),m:String(a),mm:M.s(a,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:s};return n.replace(h,(function(e,t){return t||v[e]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(i,d,f){var p,h=M.p(d),v=D(i),m=(v.utcOffset()-this.utcOffset())*e,_=this-v,g=M.m(this,v);return g=(p={},p[c]=g/12,p[o]=g,p[u]=g/3,p[l]=(_-m)/6048e5,p[a]=(_-m)/864e5,p[r]=_/t,p[s]=_/e,p[n]=_/1e3,p)[h]||_,f?g:M.a(g)},m.daysInMonth=function(){return this.endOf(o).$D},m.$locale=function(){return y[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),n=b(e,t,!0);return n&&(i.$L=n),i},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),T=w.prototype;return D.prototype=T,[["$ms",i],["$s",n],["$m",s],["$H",r],["$W",a],["$M",o],["$y",c],["$D",d]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),D.extend=function(e,t){return e.$i||(e(t,w,D),e.$i=!0),D},D.locale=b,D.isDayjs=$,D.unix=function(e){return D(1e3*e)},D.en=y[g],D.Ls=y,D.p={},D}()}},t={};function i(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,i="beforeend"){t.insertAdjacentElement(i,e.getElement())}const n=[{title:"day",label:"Day"},{title:"event",label:"Event"},{title:"time",label:"Time"},{title:"price",label:"Price"},{title:"offer",label:"Offers"}],s=[{title:"everything",label:"everything"},{title:"future",label:"future"},{title:"present",label:"present"},{title:"past",label:"past"}].map((e=>`<div class="trip-filters__filter">\n            <input id="filter-${e.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${e.title}">\n            <label class="trip-filters__filter-label" for="filter-${e.title}">${e.label}</label>\n          </div>`));class r{getTemplate=()=>`<form class="trip-filters" action="#" method="get">\n            ${s.join("")}\n          </form>`;getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}class a{getTemplate=()=>'<ul class="trip-events__list"></ul>';getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}var l=i(484),o=i.n(l);function u(e){return e[Math.floor(Math.random()*e.length)]}function c(e){return e?o()(e).format("HH:mm"):"..."}class d{constructor({pointData:e,allOffers:t}){this.pointData=e,this.allOffers=t}getTemplate=()=>((e,t)=>{const{type:i,finishPoint:n,price:s,startDate:r,startTime:a,endTime:l,offers:u}=e,d=(f=r)?o()(f).format("MMM DD"):"";var f;const p=`${i} ${n}`,h=c(a),v=c(l),m=function(e,t){const i=o()(e),n=o()(t).diff(i,"minute");return n<60?`${n}M`:n>60&&n<1440?o()(n).format("HH[H] mm[M]"):o()(n).format("DD[D] HH[H] mm[M]")}(a,l);return`<li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="2019-03-18">${d}</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${p}</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="2019-03-18T10:30">${h}</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="2019-03-18T11:00">${v}</time>\n                  </p>\n                  <p class="event__duration">${m}</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${s}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n\n                <ul class="event__selected-offers">\n                    ${t.find((e=>e.type===i)).offers.map((e=>(e=>u.includes(e.id)?`<li class="event__offer">\n        <span class="event__offer-title">${e.title}</span>\n        <span class="event__offer-price">${e.price}</span>\n      </li>`:"")(e))).join("")}\n                </ul>\n\n                <button class="event__favorite-btn event__favorite-btn--active" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>`})(this.pointData,this.allOffers);getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}const f=[{type:"flight",offers:[{id:1,title:"Flexible schedule and returning tickets",price:80},{id:2,title:"Setting luggage and safeness anytime",price:30},{id:3,title:"Aircraft captain will be glad to share company with you",price:330},{id:4,title:"Best TV and viedo service on the board",price:210}]},{type:"taxi",offers:[{id:1,title:"Choose Radio",price:15},{id:2,title:"Provide safeness",price:30},{id:3,title:"Driver will keep silence",price:100},{id:4,title:"Help with direction",price:50}]},{type:"bus",offers:[{id:1,title:"Favourite Radio",price:15},{id:2,title:"Setting luggage",price:30},{id:3,title:"Silence all way",price:100},{id:4,title:"Help with direction",price:50}]},{type:"train",offers:[{id:1,title:"Choose Radio",price:15},{id:2,title:"Alcohol free!",price:30},{id:3,title:"Seafood all seasons",price:100},{id:4,title:"Help you with direction",price:50}]},{type:"ship",offers:[{id:1,title:"Favourite Radio",price:15},{id:2,title:"Alcohol free!",price:30},{id:3,title:"Vegeterian all seasons",price:100},{id:4,title:"Help you with direction",price:50}]},{type:"drive",offers:[{id:1,title:"Choose your favourite Radio",price:15},{id:2,title:"No strong alcohol on the board",price:5},{id:3,title:"Vegeterian and seafood",price:100},{id:4,title:"Help with direction",price:50}]},{type:"restaurant",offers:[{id:1,title:"Listen favourite music",price:115},{id:2,title:"Alcohol free!",price:30},{id:3,title:"Seafood all seasons",price:100},{id:4,title:"Best steaks and BBQ ever",price:50}]},{type:"sightseeing",offers:[{id:1,title:"Sex, drugs and rock n roll",price:115},{id:2,title:"Alcohol free!",price:300},{id:3,title:"Best museums you ve ever seen",price:500},{id:4,title:"Best guides",price:500}]},{type:"check-in",offers:[{id:1,title:"Early birds!",price:115},{id:2,title:"Alcohol free!",price:30},{id:3,title:"Best drinks",price:100},{id:4,title:"May take animals",price:150}]}];class p{offersList=Array.from(f);getOffersList(){return this.offersList}}class h{getTemplate=()=>`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            ${n.map((e=>`<div class="trip-sort__item  trip-sort__item--${e.title}">\n              <input id="sort-${e.title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e.title}">\n              <label class="trip-sort__btn" for="sort-${e.title}">${e.label}</label>\n            </div>`)).join("")}\n          </form>`;getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}const v=["flight","taxi","bus","train","ship","drive","restaurant","sightseeing","check-in"],m={description:"",type:"flight",offers:[],finishPoint:"",startDate:"",startTime:"",endTime:"",timePeriod:"",price:0,isFavourite:!1,pictures:[]},_=v.map((e=>`<div class="event__type-item">\n            <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n            <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${e}</label>\n          </div>`));class g{constructor({formData:e=m,allOffers:t}){this.formData=e,this.allOffers=t}getTemplate=()=>((e,t)=>{const i=this.allOffers.find((t=>t.type===e.type));return`<li class="trip-events__item">\n                <form class="event event--edit" action="#" method="post">\n                    <header class="event__header">\n                        <div class="event__type-wrapper">\n                            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                              <span class="visually-hidden">Choose event type</span>\n                              <img class="event__type-icon" width="17" height="17" src="img/icons/${e.type}.png" alt="Event type icon">\n                            </label>\n                            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n                            <div class="event__type-list">\n                                <fieldset class="event__type-group">\n                                    ${_.join("")}\n                                </fieldset>\n                            </div>\n                        </div>\n                        <div class="event__field-group  event__field-group--destination">\n                            <label class="event__label  event__type-output" for="event-destination-1">${e.type}</label>\n                            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${e.finishPoint}" list="destination-list-1">\n                            <datalist id="destination-list-1">\n                              <option value="Amsterdam"></option>\n                              <option value="Geneva"></option>\n                              <option value="Chamonix"></option>\n                            </datalist>\n                        </div>\n\n                        <div class="event__field-group  event__field-group--time">\n                          <label class="visually-hidden" for="event-start-time-1">From</label>\n                          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">\n                          &mdash;\n                          <label class="visually-hidden" for="event-end-time-1">To</label>\n                          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">\n                        </div>\n\n                        <div class="event__field-group  event__field-group--price">\n                          <label class="event__label" for="event-price-1">\n                            <span class="visually-hidden">Price</span>\n                            &euro;\n                          </label>\n                          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${e.price}">\n                        </div>\n\n                        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                        <button class="event__reset-btn" type="reset">Delete</button>\n                        <button class="event__rollup-btn" type="button">\n                          <span class="visually-hidden">Open event</span>\n                        </button>\n                    </header>\n\n                    <section class="event__details">\n                        <section class="event__section  event__section--offers">\n                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n                        <div class="event__available-offers">\n                            ${i.offers.map((t=>`\n                                <div class="event__offer-selector">\n                                    <input class="event__offer-checkbox\n                                            visually-hidden"\n                                            id="event-${t.title}-1"\n                                            type="checkbox"\n                                            name="event-${t.title}"\n                                            ${e.offers.includes(t.id)?"checked":""}>\n                                    <label class="event__offer-label" for="event-${t.title}-1">\n                                      <span class="event__offer-title">${t.title}</span>\n                                      &plus;&euro;&nbsp;\n                                      <span class="event__offer-price">${t.price}</span>\n                                    </label>\n                                </div>`)).join("")}\n                        </div>\n                        </section>\n                    </section>\n                </form>\n            </li>`})(this.formData);getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}const y=["2024-05-20T08:02:17-05:00","2024-05-11T08:02:17-05:00","2024-05-15T08:02:17-05:00","2024-05-02T08:02:17-05:00"],$=[{description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",type:u(v),offers:[2],finishPoint:"Amsterdam",startDate:new Date(u(y)),startTime:"2024-04-10T10:30:00",endTime:"2024-04-10T11:30:00",timePeriod:"",price:886,isFavourite:!0,pictures:[]},{description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",type:u(v),offers:[4],finishPoint:"Habmurg",startDate:new Date(u(y)),startTime:"2024-04-10T10:30:00",endTime:"2024-04-10T13:30:00",price:2225,isFavourite:!0,pictures:[]},{description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",type:u(v),offers:[1,3],finishPoint:"Seoul",startDate:new Date(u(y)),startTime:"2024-04-10T10:30:00",endTime:"2024-04-11T13:30:00",price:89,isFavourite:!0,pictures:[]},{description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",type:u(v),offers:[3],finishPoint:"Tokyo",startDate:new Date(u(y)),startTime:"2024-04-10T10:30:00",endTime:"2024-04-10T10:45:00",price:647,isFavourite:!0,pictures:[]}],b=()=>u($),D=new class{destinationList=Array.from({length:4},b);getDestinationList(){return this.destinationList}},M=document.querySelector(".page-body"),w=M.querySelector(".trip-events"),T=M.querySelector(".trip-main"),S=new class{filtersWrapper=new r;destinationWrapper=new a;offersModel=new p;constructor({headerContainer:e,mainContainer:t,destinationModel:i}){this.headerContainer=e,this.mainContainer=t,this.destinationModel=i}init(){this.destinatonList=[...this.destinationModel.getDestinationList()],this.offers=[...this.offersModel.getOffersList()],t(this.filtersWrapper,this.headerContainer),t(this.destinationWrapper,this.mainContainer),t(new h,this.destinationWrapper.getElement()),t(new g({formData:this.destinatonList[1],allOffers:this.offers}),this.destinationWrapper.getElement());for(let e=0;e<this.destinatonList.length;e++)t(new d({pointData:this.destinatonList[e],allOffers:this.offers}),this.destinationWrapper.getElement())}}({headerContainer:T,mainContainer:w,destinationModel:D});S.init()})()})();
//# sourceMappingURL=bundle.db29147b6fe8f1dc2ba7.js.map