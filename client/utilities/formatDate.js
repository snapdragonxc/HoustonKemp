'use strict';
export default function(d){
    var months = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
    var d = new Date(d);
    return (d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear());
};