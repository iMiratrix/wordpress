"use strict";function wteGetFormatedPrice(price,format,numberOfDecimals){return price=price||0,format=format||!0,numberOfDecimals=numberOfDecimals||0,"undefined"!=typeof WTE_CC_convData&&WTE_CC_convData.rate&&(price*=parseFloat(WTE_CC_convData.rate)),0==format?price:(price=(price=(price=parseFloat(price)).toFixed(numberOfDecimals)).replace(".00",""),price=addCommas(price))}function wteGetFormatedPriceWithCurrencyCode(price,code,format,numberOfDecimals){return(code=code||wte.currency.code)+" "+wteGetFormatedPrice(price,format,numberOfDecimals)}function wteGetFormatedPriceWithCurrencyCodeSymbol(price,code,symbol,format,numberOfDecimals){return code=code||wte.currency.code,symbol=symbol||wte.currency.symbol,'<span class="wpte-currency-code">'+("code"===wte_currency_vars.code_or_symbol?code:symbol)+'</span> <span class="wpte-price">'+wteGetFormatedPrice(price,format,numberOfDecimals)+"</span>"}function wteGetFormatedPriceWithCurrencySymbol(price,symbol,format,numberOfDecimals){return(symbol=symbol||wte.currency.symbol)+wteGetFormatedPrice(price,format,numberOfDecimals)}function calculateGrandTotal(){return parseFloat(window.wte.trip.travellersCost)+parseFloat(window.wte.trip.extraServicesCost)}jQuery(document).ready(function($){var currentTab=$(".wpte-bf-step.active"),currentTabContent=$(".wpte-bf-step-content.active"),isDateSelected=!1;function applyFixStratingDatePrice(date,cost){if(""==window.wte_fix_date.enabled)return cost;try{for(var costCount=wte_fix_date.cost.length,i=0;i<costCount;i++){if(wte_fix_date.use_multi_prices)return cost;var dateKey=date.split("-").map(function(d){return+d}).join("-"),tempCost=wte_fix_date.cost[i][dateKey];if(void 0!==tempCost)return tempCost}}catch(err){return cost}return cost}function populateHTML(){if($("body").hasClass("single-trip")){var travellersCost=function(){var numberFields=$('.wpte-bf-content-travellers .wpte-bf-number-field > input[type="text"]'),total=0;return $.each(numberFields,function(index,numberField){var cost=calculateSingleTravellerTypeCost(numberField);total+=cost}),total}();window.wte.trip.travellersCost=travellersCost;var grandTotal=calculateGrandTotal(),formattedGrandTotal=(wteGetFormatedPriceWithCurrencyCodeSymbol(travellersCost,wte.currency.code,wte.currency.symbol),wteGetFormatedPrice(grandTotal)),formattedGrandTotalWithCodeSymbol=wteGetFormatedPriceWithCurrencyCodeSymbol(grandTotal,wte.currency.code,wte.currency.symbol);wteGetFormatedPriceWithCurrencyCodeSymbol(wte.trip.price,wte.currency.code);window.wteCartFields["trip-cost"]=grandTotal,$(".wpte-bf-total-price > .wpte-price").html(formattedGrandTotal);var numberFields=$('.wpte-bf-content-travellers .wpte-bf-number-field > input[type="text"]'),html="";$.each(numberFields,function(index,numberField){var count=$(numberField).val(),cartField=$(numberField).data("cartField"),type=$(numberField).data("type"),costField=$(numberField).data("costField"),cost=calculateSingleTravellerTypeCost(numberField),formattedCost=wteGetFormatedPriceWithCurrencyCodeSymbol(cost,wte.currency.code,wte.currency.symbol),pricing_type=$(numberField).data("pricing-type")||"per-person";window.wteCartFields[cartField]=count,window.wteCartFields[costField]=cost,count>1&&("group"==type||"per-group"===pricing_type)&&(count=1),-1!==$.inArray(type,Object.keys(wte.pax_labels))&&(type=wte.pax_labels[type]);var capitalizeType=type.charAt(0).toUpperCase()+type.substring(1);count>1&&"traveler"==type?capitalizeType="Travelers":count>1&&"child"==type?capitalizeType="Children":count>1&&"Adult"==type||"adult"==type?capitalizeType="Adults":count>1&&("group"==type||"per-group"===pricing_type)&&(count=1);var price=cost/count;if(!isFinite(price)){""==(price=$(numberField).data("cost"))&&(price=0);try{price=applyFixStratingDatePrice(window.wteCartFields["trip-date"],price)}catch(err){}}var formattedPriceWithSymbol=wteGetFormatedPriceWithCurrencySymbol(price=(price=parseFloat(price)).toFixed(2),wte.currency.symbol),priceHtml=(wteGetFormatedPrice(price),wteGetFormatedPriceWithCurrencyCodeSymbol(price,wte.currency.code,wte.currency.symbol));jQuery(this).parents(".wpte-bf-traveler-block").find(".wpte-bf-price ins").html(priceHtml),0!=cost&&(html+=`\n                <tr>\n                    <td>${count} x ${capitalizeType} <span class="wpte-bf-info">(${formattedPriceWithSymbol}/${type})<span></span></td>\n                    <td>${formattedCost}</td>\n                </tr>\n            `)}),$(".wpte-bf-travellers-price-table tbody").html(html),$(".wte-bf-price-detail .wpte-bf-total").html(`\n            ${wte.totaltxt} <b>${formattedGrandTotalWithCodeSymbol}</b>\n        `)}}function calculateSingleTravellerTypeCost(numberField){var count=$(numberField).val(),price=$(numberField).data("cost");(isNaN(price)||""==price)&&(price=0);try{price=parseFloat(applyFixStratingDatePrice(window.wteCartFields["trip-date"],price))}catch(err){}var type=$(numberField).data("type"),pricing_type=$(numberField).data("pricing-type")||"per-person";if(("group"==type||"per-group"==pricing_type)&&count>0)cost=parseFloat(price);else var cost=parseInt(count)*parseFloat(price);try{cost=parseFloat(applyGroupDiscount(count,type,cost))}catch(err){}return cost}window.wteCartFields={action:"wte_add_trip_to_cart",nonce:$("#nonce").val(),"trip-id":wte.trip.id,travelers:1,"trip-cost":wte.trip.price},toastr.options.positionClass="toast-bottom-full-width",toastr.options.timeOut="10000",$(".wpte-bf-toggle-wrap .wpte-bf-toggle-title").click(function(event){event.preventDefault(),$(this).parents(".wpte-bf-toggle-wrap").toggleClass("active"),$(this).siblings(".wpte-bf-toggle-content").fadeToggle("slow",function(){$(this).is(":visible")?($(this).siblings(".wpte-bf-toggle-title").find(".wtebf-toggle-title").hide(),$(this).siblings(".wpte-bf-toggle-title").find(".wtebf-toggle-title-active").show()):($(this).siblings(".wpte-bf-toggle-title").find(".wtebf-toggle-title").show(),$(this).siblings(".wpte-bf-toggle-title").find(".wtebf-toggle-title-active").hide())})}),jQuery(".wpte-bf-content-travellers .wpte-bf-number-field").each(function(){var spinner=jQuery(this),input=spinner.find('input[type="text"]'),btnUp=spinner.find(".wpte-bf-plus"),btnDown=spinner.find(".wpte-bf-minus");input.attr("min"),input.attr("max");btnUp.click(function(event){event.preventDefault();var input=$(this).parent().find("input"),max=$(input).attr("max"),value=parseFloat(input.val());++value>=max&&(value=max),spinner.find("input").val(value),spinner.find("input").trigger("change");var type=$(this).parents(".wpte-bf-number-field").find('input[type="text"]').data("cartField");window.wteCartFields[type]=value,populateHTML()}),btnDown.click(function(event){event.preventDefault();var input=$(this).parent().find("input"),min=$(input).attr("min"),value=parseFloat(input.val());--value<=min&&(value=min),spinner.find("input").val(value),spinner.find("input").trigger("change");var type=$(this).parents(".wpte-bf-number-field").find('input[type="text"]').data("cartField");window.wteCartFields[type]=value,populateHTML()})});var availableDates=[];try{for(var availableDatesCount=wte_fix_date.cost.length,i=0;i<availableDatesCount;i++)availableDates.push(Object.keys(wte_fix_date.cost[i])[0])}catch(err){}function convertToUTC(date){return new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0,0))}var allrruleDates={};function getDates(date){if(wte.booking_cutoff.enable&&parseInt(wte.booking_cutoff.cutoff)>0){var today=convertToUTC(new Date),cutoffTime=60*parseInt(wte.booking_cutoff.cutoff)*60*1e3;if(cutoffTime="days"===wte.booking_cutoff.unit?24*cutoffTime:cutoffTime,bookableDate=new Date(today.getTime()+cutoffTime),convertToUTC(date).getTime()<convertToUTC(bookableDate).getTime())return[]}if(!wte_fix_date.departureDates)return availableDates.map(function(ad){return convertToUTC(new Date(ad))});var departureDates=wte_fix_date.departureDates,indexes=departureDates.sdate?Object.keys(departureDates.sdate):[],rruleset=new rrule.RRuleSet;return indexes.forEach(function(i){var _rruleset=new rrule.RRuleSet,recurring=void 0!==departureDates&&void 0!==departureDates[i]?departureDates[i].recurring:null;if(recurring&&"true"==recurring.enable){var rule={},until=new Date(recurring.until);if(new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0,0)).getTime()>new Date(Date.UTC(until.getFullYear(),until.getMonth(),until.getDate(),0,0,0,0)).getTime())return;rule.freq=rrule.RRule[recurring.type];var startDate=convertToUTC(new Date(departureDates.sdate[i]));rule.dtstart=startDate,recurring.months&&"MONTHLY"==recurring.type&&(rule.bymonth=Object.values(recurring.months).map(function(m){return+m}),rule.dtstart.setDate(startDate.getDate())),recurring.week_days&&"WEEKLY"==recurring.type&&(rule.byweekday=Object.values(recurring.week_days).map(function(wd){return rrule.RRule[wd]})),rule.count=+recurring.limit||10,rruleset.rrule(new rrule.RRule(rule)),_rruleset.rrule(new rrule.RRule(rule)),_rruleset.all().forEach(function(rs){if(!allrruleDates[rs.getTime()]){allrruleDates[rs.getTime()]=!0;var dateStr=rs.getFullYear()+"-"+(+rs.getMonth()+1)+"-"+rs.getDate();wte_fix_date.cost.push({[dateStr]:departureDates.cost[i]});var bookedSeats=wte_fix_date.bookedSeats[rs.getTime()]&&wte_fix_date.bookedSeats[rs.getTime()].booked||0,seatsLeft=+departureDates.seats_available[i]-+bookedSeats;wte_fix_date.seats_available.push({[dateStr]:seatsLeft}),wte_fix_date.fdd_ids.push({[dateStr]:rs.getTime()})}})}else{var rs=new Date(departureDates.sdate[i]);if(wte.booking_cutoff.enable&&parseInt(wte.booking_cutoff.cutoff)>0){var today=new Date;today=new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0,0));var cutoffTime=60*parseInt(wte.booking_cutoff.cutoff)*60*1e3;cutoffTime="days"===wte.booking_cutoff.unit?24*cutoffTime:cutoffTime,bookableDate=new Date(today.getTime()+cutoffTime),convertToUTC(rs).getTime()>convertToUTC(bookableDate).getTime()&&rruleset.rdate(rs)}else convertToUTC(rs).getTime()>convertToUTC(convertToUTC(new Date)).getTime()&&rruleset.rdate(rs);if(allrruleDates[rs.getTime()])return;allrruleDates[rs.getTime()]=!0;var dateStr=rs.getFullYear()+"-"+(+rs.getMonth()+1)+"-"+rs.getDate();wte_fix_date.cost.push({[dateStr]:departureDates.cost[i]});var bookedSeats=wte_fix_date.bookedSeats[rs.getTime()]&&wte_fix_date.bookedSeats[rs.getTime()].booked||0,seatsLeft=+departureDates.seats_available[i]-+bookedSeats;wte_fix_date.seats_available.push({[dateStr]:seatsLeft}),wte_fix_date.fdd_ids.push({[dateStr]:rs.getTime()})}}),rruleset.all()}function checkAvailableDates(date){var dmy=$.datepicker.formatDate($.datepicker.ISO_8601,date),today=new Date;today=new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0,0));var bookableDate=null;if(wte.booking_cutoff.enable&&parseInt(wte.booking_cutoff.cutoff)>0){var cutoffTime=60*parseInt(wte.booking_cutoff.cutoff)*60*1e3;cutoffTime="days"===wte.booking_cutoff.unit?24*cutoffTime:cutoffTime,bookableDate=new Date(today.getTime()+cutoffTime),bookableDate=new Date(Date.UTC(bookableDate.getFullYear(),bookableDate.getMonth(),bookableDate.getDate(),0,0,0,0))}else bookableDate=new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0,0));if(!wte_fix_date||wte_fix_date.departureDates&&!wte_fix_date.departureDates.cost)return convertToUTC(date)>=bookableDate?[!0,"","Available"]:[!1,"","Unavailable"];var validDates=getDates(date).filter(function(vd){return convertToUTC(vd)>=bookableDate}).map(function(d){return d.getTime()});if(validDates.length<=0&&convertToUTC(date)>=bookableDate)return[!0,"","Available"];for(var fixDatesCount=wte_fix_date.seats_available.length,index=0;index<fixDatesCount;index++)if("0"==wte_fix_date.seats_available[index][dmy]||""==wte_fix_date.seats_available[index][dmy])return[!1,"","Unavailable"];return $recurredDate=validDates.find(function(d){return new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0,0)).getTime()===d}),$recurredDate?[!0,"","Available"]:[!1,"","Unavailable"]}function changeTab(tab){if(!isDateSelected)return!1;currentTab=tab;var tabs=$(".wpte-bf-step"),index=$(tabs).index(tab);$(currentTabContent).fadeOut("slow",function(){$(currentTab).addClass("active"),$(currentTabContent).removeClass("active"),currentTabContent=$(".wpte-bf-step-content")[index],$(currentTabContent).css("display",""),$(currentTabContent).css("opacity",""),$(currentTabContent).addClass("active"),0===index?$(".wte-bf-price-detail").css("display","none"):$(".wte-bf-price-detail").css("display",""),index+1>=tabs.length?$('.wte-bf-price-detail .wpte-bf-btn-wrap input[type="button"]').val(wte.bookNow):$('.wte-bf-price-detail .wpte-bf-btn-wrap input[type="button"]').val(wte_strings.bookingContinue||"Continue")})}function getNextTab(tab){var tabs=$(".wpte-bf-step"),index=$(tabs).index(tab);return!(index+1>=tabs.length)&&tabs[index+1]}$(".wpte-bf-datepicker").datepicker({minDate:0,beforeShowDay:"undefined"!=typeof wte_fix_date&&wte_fix_date.departureDates&&"1"==wte_fix_date.enabled?checkAvailableDates:0==availableDates.length||"undefined"!=typeof wte_fix_date&&""==window.wte_fix_date.enabled?function(date){if(wte.booking_cutoff.enable&&parseInt(wte.booking_cutoff.cutoff)>0){var today=new Date,calendarDate=new Date(date.getTime()+864e5),cutoffTime=60*parseInt(wte.booking_cutoff.cutoff)*60*1e3;if(cutoffTime="days"===wte.booking_cutoff.unit?24*cutoffTime:cutoffTime,new Date(today.getTime()+cutoffTime).getTime()>calendarDate.getTime())return[!1,"","Unavailable"]}return[!0,"","Available"]}:checkAvailableDates,dateFormat:"yy-mm-dd",onSelect:function(dateText,inst){isDateSelected=!0;var nextTab=getNextTab();if(nextTab&&($(".wpte-bf-step").removeClass("active"),$(currentTab).removeClass("active"),changeTab(nextTab)),window.wteCartFields["trip-date"]!=dateText){window.wteCartFields["trip-date"]=dateText;try{if(""==window.wte_fix_date.enabled)return}catch(err){}try{for(var seatsAvailableLength=wte_fix_date.seats_available.length,i=0;i<seatsAvailableLength;i++){var seatsAvailable=wte_fix_date.seats_available[i][dateText];wte_fix_date.cost[i][dateText];if(void 0!==seatsAvailable){var numberFields=$(".wpte-bf-content-travellers").find('input[type="text"]');$.each(numberFields,function(index,numberField){var cartField=$(numberField).data("cartField"),defaultCount="travelers"==cartField||"pricing_options[adult][pax]"==cartField?1:0;$(numberField).val(defaultCount),$(numberField).attr("max",seatsAvailable),$(".wpte-bf-content-travellers").data("maxtravellers",seatsAvailable)})}}}catch(err){}populateHTML()}}}),$('.wpte-bf-btn-wrap > input[type="button"]').click(function(event){event.preventDefault();var nextTab=getNextTab(currentTab);if(nextTab){if("wpte-bf-step-travellers"==currentTab.dataset.stepName||"travellers"==currentTab.innerText.toLowerCase()){var total_pax=0;$(".wpte-bf-content-travellers").find("input").each(function(i,n){total_pax+=parseInt($(n).val(),10)});var MIN_PAX=parseInt($(".wpte-bf-content-travellers").data("mintravellers")),MAX_PAX=parseInt($(".wpte-bf-content-travellers").data("maxtravellers"));if(!(total_pax>=MIN_PAX&&total_pax<=MAX_PAX)){var finalstr=wte_strings.pax_validation.replace("%2$s",MIN_PAX).replace("%3$s",MAX_PAX).replace("%1$s",total_pax);return toastr.error(finalstr),!1}$(".wpte-bf-step").removeClass("active"),$(currentTab).removeClass("active"),changeTab(nextTab)}}else $.ajax({type:"POST",url:WTEAjaxData.ajaxurl,data:window.wteCartFields,success:function(data){var i;if(data.success)$("#price-loading").fadeOut(500),location.href=wp_travel_engine.CheckoutURL;else for(i=0;i<data.data.length;i++)toastr.error(data.data[i])}})}),$("#wpte-booking-form").on("click",".wpte-bf-step",function(event){if(event.preventDefault(),!isDateSelected)return!1;$(".wpte-bf-step").removeClass("active"),$(this).removeClass("active"),changeTab(this)}),populateHTML()});