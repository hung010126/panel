
  let link = window.location.href ;
  let user = localStorage.dangnhap ;
  let timelog = localStorage.timelg ;
  let tk = '' , ds_thuky = [] , ds_phanloai = [] , ds_gsgk = [] 
  // ds_phanloai = [maclb,ndcu,ndmoi,tên gọi,cot trong gg sheet]
function dangnhap(){
         if(user == '' || user == null || user == undefined || timelog == undefined || timelog == '') return  window.location.href = 'login.html'
         var gio = new Date().getTime() , tru = gio - timelog , tr = tru / (1000 * 60 * 60) ; if(tr > 72 )  return  thoat()
         var tt = JSON.parse(user) , ten = tt['ten'] ; console.log(tt) ; tk = tt ; nhapval('#tkdn',`<div class="small">Xin chào:</div>${ten}`,2)
                 tao_tbthicap()
        }

        function tao_tbthicap(){
          nhapinner('sl_chon','')
          nhapinner('sl_tt','')
          nhapinner('sl_dat','')
          nhapinner('sl_thay','')
 let obj = { ht : 'dt_thicap' }
 momodal()				  
 fetch(api,{
method:"POST",
body:JSON.stringify(obj)
}).then(res => res.json())
  .then(dt => {
    console.log(dt)
        if(dt.tb == 'ok'){		 		
          tatmodal()
          var h = dt.dl , tt = tk['phan_tk'] == 'ok' ? h.slice(1) : h.filter(v => u(v[42]) == tk['ten'])
          ds_thuky = dt.ds
          ds_gsgk = dt.gsgk
           var screenWidth = $(window).width();
           var fixedColumnsCount = screenWidth < 768 ? 1 : 7;

         

        // --- Khởi tạo DataTable ---
        $('#dt_thicap').DataTable({
            data: tt.map((r,vt) => {
          var chotso = u(r[46]) == '' ? 'mo' : 'khoa'  
             return [
               width(u(r[3]),100)
               ,width(check_quythi(u(r[6])),100)
               ,width(u(r[0]).split(' ')[0].split('/').reverse().join('-'),100)
               ,width(u(r[6]).split(' ')[0].split('/').reverse().join('-'),100)
               ,width(u(r[6]).split(' ')[1],80)           
               ,width(u(r[5]),80)
               ,u(r[7])
              ,width(chon_sl(u(r[45]),chotso,`soluong1_${vt}`,'TT',u(r[3])+'<@>'+u(r[9]),'AT'),120)
              ,width(chon_sl(u(r[46]),chotso,`soluong2_${vt}`,'Đạt',u(r[3])+'<@>'+u(r[9]),'AU'),120)
               ,width( tk['phan_tk'] == 'ok' ? `<div id = "phancong_${vt}" ${chotso == 'khoa' ? 'class = "chudo" onclick = "alert(\'Đã khóa sổ!\')"' : `ondblclick = "chonphancong(\'${u(r[42])}\',\'${u(r[3])+'<@>'+u(r[9])}\',\'${vt}\')"`} >
                 ${ 
                     chotso == 'khoa' || ds_thuky.findIndex(zz => u(zz[0]) == u(r[42])) >= 0 ? u(r[42]) : 'Phân công thư ký'
                 }</div>` : u(r[42]) , 200)

                 ,width(chongsgk(u(r[10]),chotso,`giam1_${vt}`,'GS',u(r[3])+'<@>'+u(r[9]),'K'),200)
                 ,width(chon_trangthai(u(r[12]),chotso,`ttgiam1_${vt}`,'GS',u(r[3])+'<@>'+u(r[9]),'M'),200)
                 ,width(chongsgk(u(r[14]),chotso,`giam2_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'O'),200)
                 ,width(chon_trangthai(u(r[16]),chotso,`ttgiam2_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'Q'),200)
                 ,width(chongsgk(u(r[18]),chotso,`giam3_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'S'),200)
                  ,width(chon_trangthai(u(r[20]),chotso,`ttgiam3_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'U'),200)
                 ,width(chongsgk(u(r[22]),chotso,`giam4_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'W'),200)
                  ,width(chon_trangthai(u(r[24]),chotso,`ttgiam4_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'Y'),200)
                 ,width(chongsgk(u(r[26]),chotso,`giam5_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'AA'),200)
                  ,width(chon_trangthai(u(r[28]),chotso,`ttgiam5_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'AC'),200)
                 ,width(chongsgk(u(r[30]),chotso,`giam6_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'AE'),200)
                 ,width(chon_trangthai(u(r[32]),chotso,`ttgiam6_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'AG'),200)
                 ,width(chongsgk(u(r[34]),chotso,`giam7_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'AI'),200)
                 ,width(chon_trangthai(u(r[36]),chotso,`ttgiam7_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'AK'),200)
                 ,width(chongsgk(u(r[38]),chotso,`giam8_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'AM'),200)
                 ,width(chon_trangthai(u(r[40]),chotso,`ttgiam8_${vt}`,'GK',u(r[3])+'<@>'+u(r[9]),'AO'),200)
             ]
          }),
            columns: [
              { 'title': 'Mã CLB' }
             ,{ 'title': 'Quý thi' }
            ,{ 'title': 'Đăng ký' }
            ,{ 'title': 'Ngày thi' }
            ,{ 'title': 'Giờ thi' }
          
            ,{ 'title': 'Đơn vị' }
            ,{ 'title': 'SL ĐK' }
            ,{ 'title': 'SL TT' }
            ,{ 'title': 'SL Đạt' }
            ,{ 'title': 'Thư ký' }

             ,{ 'title': 'Giám sát' }
             ,{ 'title': 'TTGS' }
           

             ,{ 'title': 'Giám khảo 1' }
             ,{ 'title': 'TTGK1' }
          

             ,{ 'title': 'Giám khảo 2' }
             ,{ 'title': 'TTGK2' }
           
             
             ,{ 'title': 'Giám khảo 3' }
             ,{ 'title': 'TTGK3' }
           

             ,{ 'title': 'Giám khảo 4' }
             ,{ 'title': 'TTGK4' }
           

             ,{ 'title': 'Giám khảo 5' }
             ,{ 'title': 'TTGK5' }
          

             ,{ 'title': 'Giám khảo 6' }
             ,{ 'title': 'TTGK6' }
          

             ,{ 'title': 'Giám khảo 7' }
             ,{ 'title': 'TTGK7' }
            
          ],
            dom: 'QBlfrtip',
            buttons: ['copy', 'excel', 'print'],
            pageLength: 10,
            lengthMenu: [ [10, 25, 50, 100, -1 ],  ['10', '25', '50','100', 'Tất cả' ] ],
       
         fixedHeader: {
            header: true,
            headerOffset: 60
        },

            scrollX: true,
             autoWidth: false,
             language: { search: "Tìm kiếm: " },
             searchBuilder: bangdich_table,
            fixedColumns: {
                left: fixedColumnsCount
            },
            footerCallback : function (row, data, start, end, display) {
           let api = this.api();
           var dt = api.rows( {search:'applied'} ).data()
           tbb_tong(dt)    
             }
        });


        } else {
            alert(dt.nd+'\nVui lòng F5 sau ít phút!')
        }
    })
        }

        function width(x,so){return `<div style = "width:${so}px">${x}</div>`}
        function chongsgk(nd,khoa,id,loai,ma,cot){
                 if(khoa == 'khoa') return `<span class = "chudo" >${nd}</span>`
                 var ds = ds_gsgk.findIndex(b => b[5] == nd)
                 return `<div ondblclick = "chonphancong_gsgk(\'${nd}\',\'${ma}\',\'${id}\',\'${loai}\',\'${cot}\')" id = "${id}">
                        <span ${ds < 0 || nd == '' ? `class = "mau_nhe"` : '' }  >${ds < 0 || nd == '' ? `Chọn ${loai}` : nd}</span>
                 </div>`
        }

        function chon_trangthai(nd,khoa,id,loai,ma,cot){
                 if(khoa == 'khoa') return `<span class = "chudo" >${nd}</span>`
                 var chon = ['ONL','OFF'] , ds = chon.findIndex(b => b == nd)
                 return `<div ondblclick = "chonphancong_tt(\'${nd}\',\'${ma}\',\'${id}\',\'${loai}\',\'${cot}\')" id = "${id}">
                        <span ${ds < 0 || nd == '' ? `class = "mau_nhe"` : '' }  >${ds < 0 || nd == '' ? `TT ${loai}` : nd}</span>
                 </div>`
        }
        function chon_sl(nd,khoa,id,loai,ma,cot){
                 if(khoa == 'khoa') return `<span class = "chudo" >${nd}</span>`
              
                 return `<div ondblclick = "chonslthi(\'${nd}\',\'${ma}\',\'${id}\',\'${loai}\',\'${cot}\')" id = "${id}">
                        <span ${ nd == '' ? `class = "mau_nhe"` : '' }  >${ nd == '' ? `-` : nd }</span>
                 </div>`
        }

        function tachspan(x){
            var s = x.split('<span')[1].replace(/\D/g,'') ; return isNaN(Number(s)) == true ? 0 : Number(s)
        }

        function   tbb_tong(dt){
             var sl = 0 ,sl1 = 0 , sl2 = 0 ; for(z = 0 ; z < dt.length ; z++){ 
                 sl += Number(dt[z][6])
                 sl1 += Number(tachspan(dt[z][7]))
                 sl2 += Number(tachspan(dt[z][8]))

              }
             nhapinner('sl_chon',sl.toLocaleString('vi'))
             nhapinner('sl_tt',sl1.toLocaleString('vi'))
             nhapinner('sl_dat',sl2.toLocaleString('vi'))
        }

        function chonphancong(thuky,maclb,vt){
          nhapval(`#phancong_${vt}`, `<div class = "form-floating">
                   <select id = "chontk_${vt}" onchange = "chontkmoi(\'${vt}\',\'${maclb}\',\'${thuky}\',\'AQ\')"  class = "form-select" >
                          ${ds_thuky.findIndex(zz => u(zz[0]) == thuky) < 0 ? `<option selected disabled >Chọn dữ liệu</option>${ds_thuky.map(ts => {return `<option>${ts[0]}</option>`}).join('')}` 
                                                                               : ds_thuky.map(ts => {return `<option  ${ts[0] == thuky ? 'selected' : '' }  >${ts[0]}</option>`}).join('') }
                   </select>
                   <label>Chọn thư ký</label>
               </div>`,2)
            
        }

         function chonphancong_tt(nd,maclb,id,loai,cot){
             var c = ['ONL','OFF'] , l = c.map(v => {return `<option ${v == nd ? 'selected' : ''} >${v}</option>`}).join(' ') ;    nhapval(`#${id}`,`<div class = "form-floating">
              <select id = "chontt_${id}" class = "form-select"  onchange = "chon_ttmoi(\'${id}\',\'${maclb}\',\'${nd}\',\'${cot}\',\'${loai}\')" >
                 ${c.findIndex(t => t == nd) < 0 ? '<option selected disabled >Chọn dữ liệu</option>'+l : l }
              </select>
              <label>Chọn TT${loai}</label>
              </div>`,2)
         }

         function chonslthi(nd,maclb,id,loai,cot){
              nhapval(`#${id}`,`<div class = "form-floating">
              <input value = "${nd}" id = "chontt_${id}" class = "form-control" type = "number"  onchange = "chon_ttmoi(\'${id}\',\'${maclb}\',\'${nd}\',\'${cot}\',\'${loai}\')" />
              <label>Sô lượng ${loai}</label>
              </div>`,2)
         }

         function chon_ttmoi(vt,maclb,ndcu,cot,loai){
               var nd = val(`#chontt_${vt}`,1)
               nhapval(`#${vt}`,`<span class = "chuxanh" >${nd}</span>`,2)
            var tim = ds_phanloai.findIndex(z => z[0] == maclb && z[4] == cot)
            if(tim < 0){
                 ds_phanloai.push([ maclb,ndcu,nd,loai,cot])
            } else {
                 ds_phanloai[tim][2] = nd 
            }
            capnhat_pl()
         }
       

        function chonphancong_gsgk(nd,maclb,id,loai,cot){
          var ds = loai == 'GS' ? ds_gsgk.slice(1).filter(b => u(b[9]) !== '') : ds_gsgk.filter(b => b[9] == 'GK')
          modalphai_mo(`<table id = "table_chonphancong_gsgk" style = "width:100%" >
                            <thead>
                                   <tr>
                                       <th class = "thh" style="width:20%" >Mã</th>
                                       <th class = "thh"  >Tên</th>
                                       <th class = "thh" style="width:20%" >Đơn Vị</th>
                                       <th class = "thh" style="width:20%" >Nhiệm vụ</th>
                                   </tr>
                            </thead>
                           <tbody>
                                   ${ds.map((r,vt) => {
                                     return `<tr>
                                          <td>${r[4]}</td>
                                          <td>
                                              <button onclick = "chon_gsgkmoi(\'${id}\',\'${maclb}\',\'${nd}\',\'${loai}\',\'${cot}\',\'${r[5]}\')"  class = "btn btn-danger" >${r[5]}</button>
                                          </td>
                                          <td>${r[2]}</td>
                                          <td>${r[9]}</td>
                                     </tr>`
                                   }).join(' ')}
                           </tbody>
                   </table>`,`<h5 class = "chudo" >Chọn ${loai}</h5>`,`<div class = "row mb-1">
                       <div class = "col-12 mb-1">
                                 <div class = "form-floating">
                                        <input onkeyup = "filterTable(this,\'table_chonphancong_gsgk\')"  class = "form-control" type = "text" />
                                        <label>Tìm kiếm</label>
                                 </div>
                       </div>
                  </div>`)      
            
        }

        function chon_gsgkmoi(vt,maclb,ndcu,loai , cot,nd){
             modal_tat()
             nhapval(`#${vt}`,`<span class = "chuxanh" >${nd}</span>`,2)
            var tim = ds_phanloai.findIndex(z => z[0] == maclb && z[4] == cot)
            if(tim < 0){
                 ds_phanloai.push([ maclb,ndcu,nd,loai,cot])
            } else {
                 ds_phanloai[tim][2] = nd 
            }
            capnhat_pl()
        }

        function chontkmoi(vt,maclb,thuky,cot){
            var nd = val('#chontk_'+vt,1) ; nhapval(`#phancong_${vt}`,`<span class = "chuxanh" >${nd}</span>`,2)
            var tim = ds_phanloai.findIndex(z => z[0] == maclb && z[4] == cot)
            if(tim < 0){
                 ds_phanloai.push([ maclb,thuky,nd,'Thư ký',cot])
            } else {
                 ds_phanloai[tim][2] = nd 
            }
            capnhat_pl()
        }

        function capnhat_pl(){
            nhapinner('sl_thay',`<button onclick = "xem_capnhat_pl()" class = "btn btn-danger">${ds_phanloai.length}</button>`)
        }
        function xoapl(ma,vt,l){
          if(confirm('Bạn muốn loại khỏi danh sách cập nhật!') == true){
              nhapval('#xoapl_'+vt,'<span class = "chudo">Đã xóa</span>',2)
             var t = ds_phanloai.filter(b => b[0] !== ma && b[4] !== l)
             ds_phanloai = t
             capnhat_pl()
          }
            
        }
        function xem_capnhat_pl(){
                 modalphai_mo(`<table id = "table_capnhat_pl" >
                            <thead>
                                   <tr>
                                       <th class = "thh" style="width:20%" >Tên/Mã</th>
                                       <th class = "thh" style="width:40%" >Nội dung cũ</th>
                                       <th class = "thh" style="width:40%" >Nội dung mới</th>
                                   </tr>
                            </thead>
                           <tbody>
                                   ${ds_phanloai.map((r,vt) => {
                                     return `<tr>
                                          <td>${r[3]}<br>${u(r[0])}<span id = "xoapl_${vt}" ><button onclick = "xoapl(\'${r[0]}\',\'${vt}\',\'${r[4]}\')" class = "btn btn-danger" >Xóa</button></span></td>
                                          <td>${r[1]}</td>
                                          <td>${r[2]}</td>
                                     </tr>`
                                   }).join(' ')}
                           </tbody>
                   </table>`,`<h5 class = "chudo" >Danh sách thay đổi</h5>`,`<div class = "row mb-1">
                   <div class = "col-3 mb-1">
                       <button onclick = "capnhatdtmoi()" class = "btn btn-danger">Cập nhật</button>
                   </div>
                       <div class = "col-9 mb-1">
                                 <div class = "form-floating">
                                        <input onkeyup = "filterTable(this,\'table_capnhat_pl\')"  class = "form-control" type = "text" />
                                        <label>Tìm kiếm</label>
                                 </div>
                       </div>
                   </div>`)
        }


        function capnhatdtmoi(){
            if(ds_phanloai.length == 0) return alert('Vui lòng kiểm tra bạn chưa có nội dung cần thay đổi!')
            if(confirm('Bạn xác nhận cập nhật') == true){
   modal_tat()
   momodal()           
   let obj = { ht : 'capnhat', dt :  ds_phanloai  }				   
fetch(api,{
method:"POST",
body:JSON.stringify(obj)
}).then(res => res.json())
  .then(dt => {
        if(dt.tb == 'ok'){		    		
             window.location.href = 'index.html'
        } else {
            alert(dt.nd)
           
        }
    })	
            }
        }

 function check_quythi(x){
    var t = gettime(x) ; if(t == 0) return 'Lỗi quý'
    var n = new Date(t) , nam = n.getFullYear() , th = n.getMonth()
    if(th <= 2) return `Q1-${nam}`
    if(th <= 5) return `Q2-${nam}`
    if(th <= 8) return `Q3-${nam}`
    return `Q4-${nam}`
 }       

function logout(){
      if(confirm('Bạn muốn đăng xuất!') == true){
        thoat()
      }
}

function thoat(){
  localStorage.dangnhap  = ''
  localStorage.timelg = ''
  window.location.href = 'login.html'
}

function login(){
    const overlay = document.getElementById('loader-overlay');
    var id = val('#id',1) , pas = val('#pas',1) ; if(id == '' || pas == '') return alert('Tên đăng nhập hoặc mật khẩu không được để trống!')
    overlay.style.display = 'flex';
    let obj = { ht : 'dangnhap', user : id , pass : pas }				   
fetch(api,{
method:"POST",
body:JSON.stringify(obj)
}).then(res => res.json())
  .then(dt => {
     overlay.style.display = 'none';
     console.log(dt)
        if(dt.tb == 'ok'){		    		
             localStorage.dangnhap = JSON.stringify(dt.tk)
             localStorage.timelg = new Date().getTime()
             window.location.href = 'index.html'
        } else {
            alert(dt.nd)
            nhapval('.login','',1)
        }
    })	
}

function load_datatracuu(){
          let obj = { ht : 'load_datatracuu' }				   
fetch(api,{
method:"POST",
body:JSON.stringify(obj)
}).then(res => res.json())
  .then(dt => {
         if(dt.tb == 'ok'){		    		
             clubData = dt.dl
        } else {
            alert(dt.nd)
        }
    })
}

function load_clubtracuu(){
          let obj = { ht : 'load_clubtracuu' }				   
fetch(api,{
method:"POST",
body:JSON.stringify(obj)
}).then(res => res.json())
  .then(dt => {
         if(dt.tb == 'ok'){		 
              clubData = dt.dl
        } else {
            alert(dt.nd)
        }
    })
}