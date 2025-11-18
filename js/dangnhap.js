
  let link = window.location.href ;
  let user = localStorage.dangnhap ;
  let timelog = localStorage.timelg ;
  let tk = '' , dt = [] , tt_nv = [] , tt_hm = [] , tt_ghi = [] , tt_gach = [] , dschinhanh = []  ; 
  
function dangnhap(){
         if(user == '' || user == null || user == undefined || timelog == undefined || timelog == '') return  window.location.href = 'login.html'
         var gio = new Date().getTime() , tru = gio - timelog , tr = tru / (1000 * 60 * 60) ; if(tr > 72 )  return  thoat()
         var tt = JSON.parse(user) , ten = tt['ten'] ; console.log(tt) ; tk = tt ; nhapval('#tkdn',`<div class="small">Xin chào:</div>${ten}`,2)
                 tao_dtxem()
        }

 

 function tao_dtxem(){
 let obj = { ht : 'laydl_panel' }			  
 fetch(api,{
method:"POST",
body:JSON.stringify(obj)
}).then(res => res.json())
  .then(ar => {
    console.log(ar)
    if(ar.tb == 'ok'){
          dt = ar.dt
          tt_nv = ar.nv 
          tt_hm = ar.hm
          tt_ghi =ar.dt_ghi 
          tt_gach = ar.dt_gach
          dschinhanh = ar.dschinhanh 
          nhapinner('kq',`<table id="dt_end" class="display bg-light" style="width:100%">                      
                                 <thead style="background:#4076fb"></thead>
                    </table>`)
                    timkiem()
    } else {
        alert(dt.tb+'\nVui lòng F5 sau ít phút!')
    }

  })
}

function xembc(){
         var tu = val('#a1',1) , den = val('#a2',1) , kq = [] 
         if(tu == '' || den == '') return alert('Vui lòng chọn khoảng thời gian!')
         var n_t = new Date(tu).getTime() , n_d = new Date(den).getTime() ; if(n_d < n_t) return alert('Ngày đến phải lớn hơn ngày từ!')
         var cn = $('#chon_cn').val() , kh = $('#chon_kh').val().toString() , nv = $('#chon_nv').val().toString()
       console.log({cn,kh,nv}) 
         var gach = Object.groupBy(
                           tt_gach.filter(v => { var ngay_gach = gettime(u(v[4])) , loc = cn.length == 0 ? 0 : cn.findIndex(kt => kt == u(v[0])) ; return ngay_gach >= 0 && ngay_gach <= n_d && u(v[3]) == '' && loc >= 0  ? true : false })
                           .map(v => {
                            kq.push(  [u(v[5]),ns(u(v[6])) ,u(v[4]), u(v[7]) ,'gach'  ,0        , 0       , ''  ]  )
                            return [u(v[5]),ns(u(v[6])),v[0]] })
                           , v => u(v[0]))
                          

          var ghi = Object.groupBy(
                          tt_ghi.filter(v => { var ngay_ghi = gettime(u(v[4])) , loc = cn.length == 0 ? 0 : cn.findIndex(kt => kt == u(v[0]))  ; return ngay_ghi >= 0 && ngay_ghi <= n_d && loc >= 0 && u(v[3]) == '' ? true : false }) 
                          .map(d => {
                            kq.push([u(d[6]),ns(u(d[15])),u(d[4]),'-'      ,'ghi'   ,ns(u(d[13])) ,ns(u(d[14])) ,u(d[8]) ])
                            return [ `${u(d[4])}<@>${u(d[5])}<@>${u(d[6])}<@>${u(d[8])}<@>${u(d[12])}` ,ns(d[10]),ns(d[13]),ns(d[14]),ns(d[15]),gettime(d[4]),d[0] ] })
                          .sort((a,b) => a[5] - b[5] ) 
                          , v => u(v[0]))

                         
          var hm = Object.groupBy(tt_hm.sort((a,b) => gettime(u(b[2])) - gettime(u(a[2])) ), v => u(v[0]) )                
                     console.log({gach,ghi,hm}) 

          var bang_t2 = []

       for(const[key,nd] of Object.entries(ghi)){
        var [ngay,idnv,iddt,nhomhang,tuyen] = key.split('<@>') , timg = gach[iddt] , sogg = 0 , tongtien = tongmang(nd,4) , timhm = hm[iddt] , thm = '' , tienhm = '' , han_muc = 0
        var songay_ketthuctrucot0 =    ( (n_d + motngay ) - gettime(ngay) ) / motngay  
        if(timg !== undefined){
            sogg = tongmang(timg,1)
            gach[iddt].push([ iddt , tongtien     ])
        } else {
           gach[iddt] = [[iddt , tongtien]]
        }
        if(timhm !== undefined){ 
          thm = u(timhm[0][3]) == '' ? '' :    songay_ketthuctrucot0   - ns(u(timhm[0][3])) // đổi 999999999 sang rỗng
          tienhm = u(timhm[0][4]) == '' ? '' :  ns(u(timhm[0][4]))
          han_muc = u(timhm[0][3]) == '' ? 0 : ns(u(timhm[0][3]))
        }
        var sotong = sogg + tongtien
        var pl = tinh_pl( thm ,sotong , tienhm)
        var sotong_qh = (sotong * -1) > tienhm ? tienhm - (sotong * -1) : sotong
        bang_t2.push([ngay,idnv,iddt,nhomhang,tuyen, tongmang(nd,1), tongmang(nd,2), tongmang(nd,3), tongtien , sotong_qh   , thm , tienhm , pl.l1 , pl.l2 , sogg
         , sotong >= 0 ? '' : (sotong * -1) > tienhm ? 'Quá hạn' : thm > ns(han_muc) ? 'Quá hạn'  : '' 
         , thm - ns(han_muc) , ns(han_muc) 
         
         ])  
    }         
      


    var g0 = gomdt(dt,0), g1 = gomdt(nv,0) 
    var gom_bangt2 = Object.groupBy(bang_t2.sort( (qha,qhb) => { return gettime(qha[0]) - gettime(qhb[0])}) ,r => r[2])
    var gom_kh = Object.groupBy(kq,z => z[0]) , kq_kh = [] ; for(const[kz,nz] of Object.entries(gom_kh)){
        if(kz.trim() !== ''){
        var makh = 'Emty' , tenkh = 'Emty' , checkkh = g0[kz] ; if(checkkh !== undefined){
           makh = checkkh[0][3]
           tenkh = checkkh[0][4]
        } 
        var dauky = tongmang(nz.filter(bb => gettime(u(bb[2])) < n_t && u(bb[3]).toUpperCase().trim() !== 'CỌC' ).map(v => {return [ns(u(v[1]).toString())]}),0)  
        var phaithu = tongmang(nz.filter(bb => gettime(u(bb[2])) >= n_t && gettime(u(bb[2])) <= n_d && bb[4] == 'ghi'  ),1)  
        var tongthu = tongmang(nz.filter(bb => gettime(u(bb[2])) >= n_t && gettime(u(bb[2])) <= n_d && bb[4] == 'gach' && u(bb[3]).toUpperCase().trim() !== 'CỌC' ),1)  
        var rong = tongmang(nz.filter(bb => gettime(u(bb[2])) >= n_t && gettime(u(bb[2])) <= n_d  && u(bb[3]).trim() == '' ),1)
        var c31  = tongmang(nz.filter(bb => gettime(u(bb[2])) >= n_t && gettime(u(bb[2])) <= n_d  && u(bb[3]).trim() == '31' ),1)
        var c61  = tongmang(nz.filter(bb => gettime(u(bb[2])) >= n_t && gettime(u(bb[2])) <= n_d  && u(bb[3]).trim() == '61' ),1)
        var coc  = tongmang(nz.filter(bb => gettime(u(bb[2])) >= n_t && gettime(u(bb[2])) <= n_d  && u(bb[3]).toUpperCase().trim() == 'CỌC' ),1)
        var chietkhau = tongmang(nz.filter(bb => gettime(u(bb[2])) >= n_t && gettime(u(bb[2])) <= n_d  && u(bb[4]) == 'ghi' ),5)
        var thue = tongmang(nz.filter(bb => gettime(u(bb[2])) >= n_t && gettime(u(bb[2])) <= n_d  && u(bb[4]) == 'ghi' ),6)
        var vanchuyen = tongmang(nz.filter(bb => gettime(u(bb[2])) >= n_t && gettime(u(bb[2])) <= n_d  && u(bb[4]) == 'ghi' && u(bb[7]).toUpperCase().trim() == 'VC' ),1)

        var max = gom_bangt2[kz] == undefined ? 0 : tinhmax(gom_bangt2[kz])
        var hanmuc =  gom_bangt2[kz] == undefined ? 0 : ns(gom_bangt2[kz][0][11])
        var cuoiky = dauky + phaithu + tongthu
        var qh = tinhqh(gom_bangt2[kz]) , quahan = qh.cnqh 
        var conlai = dauky + phaithu + tongthu
        var congnotronghan = (cuoiky - quahan).toFixed(0) > 0 ? 0 : cuoiky - quahan
        var themcoc = (cuoiky - quahan).toFixed(0) > 0 ?  cuoiky - quahan : 0

        var qh_nn = conlai == 0 ? 0 :  Number(quahan.toFixed(1) ) *-1
        var qh_30nn = conlai == 0 ? 0 :  qh.t30*-1
        var qh_3060nn = conlai == 0 ? 0 :  qh.t30_60*-1
        var qh_60nn = conlai == 0 ? 0 :  qh.t60*-1
        var coc_nn = conlai == 0 ? 0 :  coc

         // (dauky*-1) + (phaithu*-1) + tongthu + (Number(congnotronghan.toFixed(1))*-1) + qh_nn + conlai + coc_nn + themcoc
        var so_hienthi = (dauky*-1) + (phaithu*-1) + tongthu + (Number(congnotronghan.toFixed(1))*-1) + qh_nn + conlai + coc_nn + themcoc
        if(so_hienthi > 0){
              kq_kh.push([kz,makh,tenkh,dauky*-1,phaithu*-1,tongthu,rong,c31,c61, Number(congnotronghan.toFixed(1)) *-1 , qh_nn , qh_30nn , qh_3060nn , qh_60nn
         ,coc_nn + themcoc ,chietkhau,vanchuyen,thue,conlai*-1,hm[kz] == undefined ? 'Emty NV' : hm[kz][0][1] ])
        }

        
      }                                                                 
    }

    console.log({kq_kh,gom_bangt2})
}

function tinhmax(dz){
     var dt = dz.sort( (za,zb) => {return zb[9] - za[9] } )
     var z1 = dt.filter(l => u(l[13]).toString() == '1')
     var z2 = dt.filter(l => u(l[12]).toString() == '1')
     return z1.length !== 0 ? z1[0][9] : z2.length !== 0 ? z2[0][9] : 0 
}


function tinh_pl(n,no,hm){
    return {
       l1 : n>=0 && no < 0 ? '' : n >= 0 && no > 0 ? 1 : hm > no ? 1 : no !== 0 ? 2 : ''
      ,l2: no >0 && n> 0 ? 1 : ''
    }
}

function tinhqh(dt){
       if(dt == undefined) return {cnqh:0,t30:0,t30_60:0,t60:0}
       var l = dt.filter(v => v[15] == 'Quá hạn').sort( (za,zb) => {return za[9] - zb[9] } )
       if(l.length == 0) return {cnqh:0,t30:0,t30_60:0,t60:0}
       var zqh , z30 , z30_60 , z60 , cot = 10
       var z1 = l.filter(k => k[cot] <= 30 )
       var z2 = l.filter(k => k[cot] > 30 && k[cot] <= 60 )
       var z3 = l.filter(k => k[cot] > 60 )
       zqh = ns(l[0][9])
      
       z60 = z3.length == 0 ? 0 : z3[0][9]
       z30 = z3.length !== 0 && z2.length !== 0 ? tongmang(z1,8) : z1.length !== 0 ? z1[0][9] : 0 
       z30_60 = z3.length !== 0 && z2.length !== 0 ?  zqh - z60 - z30 : z2.length !== 0 ?  z2[0][9] : 0 

       return  {cnqh:zqh,t30:z30,t30_60:z30_60,t60:z60}
}

   function modalphai_mo(nd){
             nhapinner('modalchung',`<div class = "modal_phai">
                 <div class="left-side"></div>
                 <div class="right-side">
                           
                      ${nd}
                      
                 </div> 
             </div>`)
             mo_html('modalchung')
      }

      let tt_tim = 'no' , choncn , chonkh , chonnv ;
function taolocds(ar,cot){
   var g = Object.groupBy(ar , v => {
         return u(v[2]) !== '' ? 'Bỏ' : u(v[cot])
   } )
   return Object.keys(g).filter(v => v != 'Bỏ') 
}
function timkiem(){
  console.log(dschinhanh)
  
       if(tt_tim == 'ok') return tt_tim = 'no' , modal_tat() ;
       if(tt_tim == 'no') return tt_tim = 'ok' , modalphai_mo(`
        <h4 style = "margin-top:10px;;text-align:center;color:red;">Tìm Kiếm</h4>
        <table style = "width:100%">
            <tr>
                <td>
                     <div class="form-floating" >
                                 <input id = "a1" type="date" class="form-control" >
                                 <label>Từ ngày</label>    
                     </div>
                </td>
                <td>
                     <div class="form-floating" >
                         <input id = "a2" type="date" class="form-control" >
                         <label>Đến ngày</label>    
                     </div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                 <div class="form-floating" >
                         <select class="form-select"  id="chon_cn" placeholder="Chi nhánh" multiple >
                                  ${dschinhanh.map(cn => `<option>${u(cn)}</option>`).join('')}
                         </select>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                 <div class="form-floating" >
                         <select class="form-select"  id="chon_kh" placeholder="Khách hàng" multiple >
                                  ${taolocds(dt,4).map(cn => `<option>${u(cn)}</option>`).join('')}
                         </select>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                 <div class="form-floating" >
                         <select class="form-select"  id="chon_nv" placeholder="NV kinh doanh" multiple >
                                  ${ taolocds(tt_nv,4).map(cn => `<option>${u(cn)}</option>`).join('')}
                         </select>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button onclick="xembc()" class="btn btn-primary w-100 mt-2">Xem báo cáo</button>
                </td>
            </tr>
        </table>`) , choncn = new Choices('#chon_cn',  {  removeItemButton: false  }) , chonkh = new Choices('#chon_kh',  {  removeItemButton: false  }) , chonnv = new Choices('#chon_nv',  {  removeItemButton: false  });

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



