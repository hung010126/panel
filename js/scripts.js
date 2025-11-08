window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
         if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
             document.body.classList.toggle('sb-sidenav-toggled');
         }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});






function nhapval(id,nd,so){   // Nhớ thêm # cho id hoặc . cho class hoặc ví dụ button cho loại  // quay quay <span class="fa fa-spinner fa-spin fa-3x"></span>
    var end = document.querySelectorAll(id) 
    if(so == 1){  for (let i = 0; i < end.length; i++) {   end[i].value     = nd  }  }
    if(so == 2){  for (let i = 0; i < end.length; i++) {   end[i].innerHTML = nd  }  }  
    if(so == 3){  for (let i = 0; i < end.length; i++) {   end[i].innerHTML += nd  }  }  
    if(so == 4){  for (let i = 0; i < end.length; i++) {   end[i].textContent = nd  }  }  
}

function val(id,so){   // Nhớ thêm # cho id hoặc . cho class hoặc ví dụ button cho loại
    var end = document.querySelectorAll(id) , nd = '' , st = 0 , mang = [] ;
    if(so == 1){ for (let i = 0; i < end.length; i++) { nd  = end[i].value     }   return nd  }
    if(so == 12){ for (let i = 0; i < end.length; i++) { mang.push([ end[i].value  ]) }   return mang  }
    if(so == 13){ for (let i = 0; i < end.length; i++) { mang.push([ end[i].innerText.split('\n')[0]  ]) }   return mang  }
    if(so == 11){ for (let i = 0; i < end.length; i++) { st += Number(end[i].value.replace(/\D/g,''))     }   return st  }
    if(so == 2){ for (let i = 0; i < end.length; i++) { nd  = end[i].innerHTML }   return nd  } 
    if(so == 3){ for (let i = 0; i < end.length; i++) { nd  = end[i].files     }   return nd  } 
    if(so == 33){ for (let i = 0; i < end.length; i++) { nd  = end[i].files     } ;   doc_uploadfile(nd)  } 
    if(so == 4){ for (let i = 0; i < end.length; i++) { nd  = end[i].checked     }   return nd  } 
    if(so == 5){ for (let i = 0; i < end.length; i++) { end[i].disabled = true     }    } 
    if(so == 6){ for (let i = 0; i < end.length; i++) { end[i].disabled = false     }    } 
      if(so == 7){ for (let i = 0; i < end.length; i++) { nd  = end[i].innerText }   return nd  } 
      if(so == 77){ for (let i = 0; i < end.length; i++) { mang.push([ end[i].innerText  ]) }   return mang   } 
      if(so == 8){ for (let i = 0; i < end.length; i++) { end[i].style.display = 'none'  }    } 
      if(so == 9){ for (let i = 0; i < end.length; i++) { end[i].style.display = 'block' }   } 
  
}
function u(x){ return  x == undefined ? '' : x}
function dd00(x){ var k = u(x).toString() ; return isNaN(Number(k)) == true ? '' : Number(k) > 9 ? k : `0${Number(k)}` }
function momodal(){
    var end = document.querySelectorAll('#hienthi_modal')
    for (let i = 0; i < end.length; i++) { end[i].classList.add("show") , end[i].style.display = 'block' } 
  }
  
  function tatmodal(){
    var end = document.querySelectorAll('#hienthi_modal')
    for (let i = 0; i < end.length; i++) { end[i].classList.remove("show") , end[i].style.display = 'none' } 
  }


function modalphai_mo(nd,td,giua){
    nhapinner('modalchung',`<div class = "modal_phai">
        <div class="left-side"></div>
        <div class="right-side">
                   <button onclick = "modal_tat()" class="btn btn-danger nut_modalphai" ><i class="fa-solid fa-xmark"></i></button>
                   ${td}
             ${giua}
             <div class="scrollable-content">
             ${nd}
             </div>
        </div> 
    </div>`)
    mo_html('modalchung')
}

function modal_tat(){
    nhapinner('modalchung','')
    tat_html('modalchung')
}

function mo_html(x){
    document.getElementById(x).style.display = "block"
}

function tat_html(x){
    document.getElementById(x).style.display = "none"
}

function nhapinner(x,nd){
    document.getElementById(x).innerHTML = nd
   }


  function filterTable(inputElement, tableId) {
  const filter = inputElement.value.toUpperCase();
  const table = document.getElementById(tableId);
  const tr = table.getElementsByTagName('tr');

  // Bắt đầu từ 1 để bỏ qua hàng tiêu đề (thường là tr[0])
  for (let i = 1; i < tr.length; i++) { 
    const td = tr[i].getElementsByTagName('td');
    let rowVisible = false;
    for (let j = 0; j < td.length; j++) {
      if (td[j]) { // Kiểm tra xem td có tồn tại không
        const cellText = td[j].textContent || td[j].innerText;
        if (cellText.toUpperCase().indexOf(filter) > -1) {
          rowVisible = true;
          break; 
        }
      }
    }

    if (rowVisible) {
      tr[i].classList.remove('hidden-row'); // Hiển thị hàng bằng cách xóa class
    } else {
      tr[i].classList.add('hidden-row');    // Ẩn hàng bằng cách thêm class
    }
  }
}

  function tinh_ngay(){
    var n = new Date()
    var hn = new Date(n.getFullYear(),n.getMonth(),n.getDate())
    var giophutgiay = 't_'+dd_00(n.getHours())+dd_00(n.getMinutes())+dd_00(n.getSeconds())
    var ng = 'd_'+n.getDate()+'_'+(n.getMonth() + 1 )+'_'+dd_00(n.getHours())+dd_00(n.getMinutes())
    return {
        hn_d : hn
        ,bg_t : n.getTime()
        ,hn_t : hn.getTime()
        ,hms : giophutgiay
        ,ngaygio : ng
        ,ngaythangnam : `${n.getFullYear()}-${dd_00(n.getMonth() + 1)}-${dd_00(n.getDate())}`
        ,baygio : `${dd_00(n.getDate())}/${dd_00(n.getMonth() + 1 )}/${n.getFullYear()} ${dd_00(n.getHours())}:${dd_00(n.getMinutes())}:${dd_00(n.getSeconds())}`
        ,vbnb : `VBNB${n.getFullYear().toString().substr(2,4)}_${dd_00(n.getDate())}${dd_00(n.getMonth() + 1 )}-${dd_00(n.getHours())}${dd_00(n.getMinutes())}${dd_00(n.getSeconds())}`
        ,matb : `TB_${n.getFullYear().toString().substr(2,4)}_${dd_00(n.getDate())}${dd_00(n.getMonth() + 1 )}_${dd_00(n.getHours())}${dd_00(n.getMinutes())}${dd_00(n.getSeconds())}`
        ,ma : `_${n.getFullYear().toString().substr(2,4)}_${dd_00(n.getDate())}${dd_00(n.getMonth() + 1 )}-${dd_00(n.getHours())}${dd_00(n.getMinutes())}${dd_00(n.getSeconds())}`
      
    }
  }

  function dd_00(x){
    if(x == '') return '00'
    if(isNaN(Number(x)) == true) return '00'
    if(Number(x) <= 9) return '0'+ ( Number(x) )
    return x
  }

   let bangdich_table = {
       //       "depthLimit": 1,
       //       // change language Add Condition button
       //       "columns": [
       //           1
       //           ,2
       //           ,3
       //           ,4
       //           //,5
       //           ,6
       //           ,7
       //           ,8
       //           ,9
       //           ,10
       //       ],
              "i18n":{
                  // /"add": $scope.textos['1840']['TEXT'], // Adicionar*
                  "add":"<i class='fa fa-plus'></i>",
                  // /"button": {
                  //     "0": "Filtros",
                  //     "_": "Filtros (%d)"
                  // },*
                  "clearAll": "<i class='fa fa-trash'></i>", 
                  "condition": 'Điều kiện',
                  "value": 'Nội dung tìm', // Valor*/
                  "data": "", //$scope.textos['352']['TEXT'], // Data
                  "logicAnd": 'Và', // E
                  "logicOr": 'Hoặc', // Ou*/
 
                  "conditions":{
                      "array":{
                          "contains": "*",
                          "empty": "",
                          "equals": "=",
                          "not": "!=",
                          "notEmpty": "!"
                      },
                      "date": {
                          "after": ">",
                          "before": "<",
                          "between": "<>",
                          "empty": "",
                          "equals": "=",
                          "not": "!=",
                          "notBetween": "><",
                          "notEmpty": "!",
                      },
                      "number": {
                          "between": "<>",
                          "empty": "",
                          "equals": "=",
                          "gt": ">",
                          "gte": ">=",
                          "lt": "<",
                          "lte": "<=",
                          "not": "!=",
                          "notBetween": "><",
                          "notEmpty": "!",
                      },
                      "string": {
                          "contains": "Chứa",
                          "empty": "Bằng Trống",
                          "endsWith": "Kết thúc bằng",
                          "equals": "Bằng",
                          "not": "Không",
                          "notEmpty": "Không trống",
                          "startsWith": "Bắt đầu bằng",
                          "notStartsWith": "Không bắt đầu bằng",
                          "notEndsWith": "Không kết thúc bằng",
                          "notContains": "Không chứa"
                      },
                      "moment": {
                          "contains": "*",
                          "empty": "",
                          "endsWith": "$",
                          "equals": "=",
                          "not": "!=",
                          "notEmpty": "!",
                          "startsWith": "^"
                      },
                  }
              },
     }

 function tao_table(result,tieude,cot_hienthi,sapxep,id,all,nutbam,tinhtong){
    const screenWidth = $(window).width();
    const fixedColumnsCount = screenWidth < 768 ? 1 : 3;

  var dodai = all == 'All' ? [ [-1],['Full']] : all == 'nam' ? [ [5,10, 25, 50, 100, -1 ],  ['5','10', '25', '50','100', 'All' ] ] : [ [10, 25, 50, 100, -1 ],  ['10', '25', '50','100', 'All' ] ]
  var obj = {
      data:result,
        fixedHeader: true,
            scrollX: true,
            // Sử dụng biến đã tính toán ở trên
            fixedColumns: {
                left: fixedColumnsCount
            },
      columns:tieude,
      columnDefs:[{ targets: cot_hienthi, className: 'all' }],
      lengthMenu: dodai,
      order: sapxep,
      dom: 'QBlfrtip',
      language: { search: "Tìm kiếm: " },
      searchBuilder: bangdich_table,
      buttons: nutbam == '' || nutbam == undefined ? [] : nutbam   
    }
    if(tinhtong !== undefined){  obj.footerCallback = tinhtong }
    return  $('#'+id).DataTable(obj);

 }

 function gettime(x){
  var z = x.split(' ')[0]
  var cn = z.split('/')
  if(cn.length ==3){
    return new Date(cn[2],(Number(cn[1])-1),cn[0],0,0,0).getTime()
  } else {
    return 0
  }
}   

  
