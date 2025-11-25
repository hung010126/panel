
  let link = window.location.href ;
  let user = localStorage.dangnhap ;
  let timelog = localStorage.timelg ;
  let tk = '' , dt = [] , tt_nv = [] , tt_hm = [] , tt_ghi = [] , tt_gach = [] , dschinhanh = [] , tt_kpi = []  ; 
  
function dangnhap(loai){
         if(user == '' || user == null || user == undefined || timelog == undefined || timelog == '') return  window.location.href = 'login.html'
         var gio = new Date().getTime() , tru = gio - timelog , tr = tru / (1000 * 60 * 60) ; if(tr > 72 )  return  thoat() // hạn chế thời gian sử dụng 3 ngày đăng nhập
         var tt = JSON.parse(user) , ten = tt['ten'] ; console.log(tt) ; tk = tt ; nhapval('#tkdn',`<div class="small">Xin chào:</div>${ten}`,2)
                 tao_dtxem(loai)
        }

 

 function tao_dtxem(loai){
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
          tt_kpi = ar.kpi
          dschinhanh = ar.dschinhanh 
          nhapinner('kq',`<div class ="text-center" style="margin-top:20px;color:red;">Vui lòng bấm nút tìm kiếm để xem báo cáo!</div>`)
          timkiem(loai)
    } else {
        alert(dt.tb+'\nVui lòng F5 sau ít phút!')
    }

  })
}

function xemchon(id){
                var container = document.getElementById(id);
                var checkedItems = container.querySelectorAll('.item.checked');
                var values = [];
                checkedItems.forEach(function(item) {
                    values.push(item.querySelector('.item-text').innerText);
                });
                return values;
}

function xembc(){
         var tu = val('#a1',1) , den = val('#a2',1) , kq = [] 
         if(tu == '' || den == '') return alert('Vui lòng chọn khoảng thời gian!')
         var [y1,m1,d1] = tu.split('-') , [y2,m2,d2] = den.split('-')
         var n_t = new Date(y1,Number(m1)-1,d1,0,0,0).getTime() , n_d = new Date(y2,Number(m2)-1,d2,0,0,0).getTime() ; if(n_d < n_t) return alert('Ngày đến phải lớn hơn ngày từ!')
         var cn = xemchon('box-1') , kh = xemchon('box-2').join(',') , nv = xemchon('box-3').join(',')
       console.log({cn,kh,nv})
       
         var gach = Object.groupBy(
                           tt_gach.filter(v => { var ngay_gach = gettime(u(v[4])) , loc = cn.length == 0 ? 0 : cn.findIndex(kt => kt == u(v[0])) ; return ngay_gach >= 1 && ngay_gach <= n_d && u(v[3]) == '' && loc >= 0  ? true : false })
                           .map(v => {
                            kq.push(  [u(v[5]),ns(u(v[6])) ,u(v[4]), u(v[7]) ,'gach'  ,0        , 0       , ''  ]  )
                            return [u(v[5]),ns(u(v[6])),v[0]] })
                           , v => u(v[0]))
                          

          var ghi = Object.groupBy(
                          tt_ghi.filter(v => { var ngay_ghi = gettime(u(v[4])) , loc = cn.length == 0 ? 0 : cn.findIndex(kt => kt == u(v[0]))  ; return ngay_ghi >= 1 && ngay_ghi <= n_d && loc >= 0 && u(v[3]) == '' ? true : false }) 
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
       // if(iddt == "DT_133425_193410_100"){
       //     console.log({ sogg , tongtien ,sotong , sotong_qh , tienhm , thm  , timg })
       // }
        bang_t2.push([ngay,idnv,iddt,nhomhang,tuyen, tongmang(nd,1), tongmang(nd,2), tongmang(nd,3), tongtien , sotong_qh   , thm , tienhm , pl.l1 , pl.l2 , sogg
         , sotong >= 0 ? '' : (sotong * -1) > tienhm ? 'Quá hạn' : thm > ns(han_muc) ? 'Quá hạn'  : '' 
         , thm - ns(han_muc) , ns(han_muc) 
         
         ])  
    }         
      
    console.log(bang_t2.filter(zz => isNaN(Number(zz[9])) == true   ))
    var tk = JSON.parse(user) , quyen = tk['quyen']
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
        var coc  = tongmang(nz.filter(bb => gettime(u(bb[2])) > 0 && gettime(u(bb[2])) <= n_d  && u(bb[3]).toUpperCase().trim() == 'CỌC' ),1)
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
        var qh_30nn = conlai == 0 ? 0 :   (qh.t30 - qh.t30_60) > 0  ? 0 :  (qh.t30 - qh.t30_60 )*-1 
        var qh_3060nn = conlai == 0 ? 0 :  (qh.t30_60 -  qh.t60 ) > 0  ? 0 :  (qh.t30_60 -  qh.t60 )*-1 
        var qh_60nn = conlai == 0 ? 0 :  qh.t60*-1
        var coc_nn = conlai == 0 ? 0 :  coc
        var conlai_n = dauky + phaithu + tongthu - Number(congnotronghan.toFixed(1)) + qh_nn -(coc_nn + themcoc)
         // (dauky*-1) + (phaithu*-1) + tongthu + (Number(congnotronghan.toFixed(1))*-1) + qh_nn + conlai + coc_nn + themcoc
        var so_hienthi = (dauky*-1) + (phaithu*-1) + tongthu + (Number(congnotronghan.toFixed(1))*-1) + qh_nn + conlai + coc_nn + themcoc
        var nvxem = hm[kz] == undefined ? 'Emty NV' : hm[kz][0][1]
        var dcxem = quyen == 'admin' ? 'ok' : tk['ten'] == nvxem ? 'ok' : 'no'
       
        if(so_hienthi > 0 && dcxem == 'ok' ){
              kq_kh.push([kz,makh,tenkh,parseInt(dauky*-1),parseInt(phaithu*-1),parseInt(tongthu),parseInt(rong),parseInt(c31),parseInt(c61), parseInt(Number(congnotronghan.toFixed(1)) *-1) , parseInt(qh_nn) , parseInt(qh_30nn) , parseInt(qh_3060nn) , parseInt(qh_60nn)
         ,parseInt(coc_nn + themcoc) ,parseInt(chietkhau),parseInt(vanchuyen),parseInt(thue),parseInt(conlai_n), nvxem ])
        }

        
      }                                                                 
    }

    var loc = locdtxem(kq_kh,kh,nv)
    var dthu = tinhdoanhthu(loc,tt_nv,tt_kpi)
    var dso = tinhds(gom_bangt2,n_t,n_d,tt_nv,kq_kh)
    hienthi_kq(loc,dthu,dso)
    console.log({kq_kh,loc,kh,nv,gom_bangt2})
}

function tinhds(gom_bangt2,n_t,n_d,tt_nv,kq_kh){
   var g = [] , ds = [], htt = '', gomnv = Object.groupBy(tt_nv , v => `${u(v[2]) !== '' ? 'Bỏ' : u(v[0]) }` ) ; for(const[key,nd] of Object.entries(gom_bangt2)){
       var dk = nd.filter(bb => gettime(u(bb[0])) >= n_t && gettime(u(bb[0])) <= n_d  )
       if(dk.length !== 0){
          dk.forEach(b => {  var nsu = gomnv[b[1]] == undefined ? 'Emty' : gomnv[b[1]][0][4] ; g.push([ nsu+'<@>'+b[3] , b[3] , ns(b[5]) , ns(b[8])   ]) })
       }
   }
    var gomnvv = Object.groupBy(tt_nv , v => `${u(v[2]) !== '' ? 'Bỏ' : u(v[4]) }` ) , gomkpi = Object.groupBy(tt_kpi , v => u(v[0]) ) , gom_1 = Object.groupBy(g , v => v[0] ) ,   gom_2 = Object.keys(Object.groupBy(g , v => v[1] ) ) , gomdt = Object.groupBy(kq_kh , v => v[19] )
     for(const[nv,nd] of Object.entries(gomdt)){
             var idnv = gomnvv[nv] == undefined ? 'Emty' : gomnvv[nv][0][0]
             var team = idnv == 'Emty' ? 'Emty' : gomkpi[idnv] == undefined ? 'Emty' : gomkpi[idnv].sort((kn,km) => {return  gettime(km[2]) - gettime(kn[2]) })[0][4]
             var tinh = [] , tong = 0 ; gom_2.forEach(h => {
                var sl = 0 , tien = 0 , chon = gom_1[nv+'<@>'+h]
                if(chon !==undefined){
                   sl = tongmang(chon,2)
                   tien = tongmang(chon,3)
                }

                tinh.push(sl)   
                tinh.push(tien)   
                tong += tien
             })
             ds.push([].concat([  team , nv , tong ] , tinh))
            }

              htt += `<tr class = "row-grand-total">
              <td   class = "text-name" ><strong>Tổng cộng :</strong></td>
               ${Array( (gom_2.length * 2) + 1 ).fill().map((zz,vt) => {  return '<td>'+tongmang(ds,vt+2).toLocaleString('vi')+'</td>' }).join('') }
            </tr>`

              var gds = Object.groupBy(ds , v => v[0] ) ; for(const[team,nd] of Object.entries(gds)){
              htt += `<tr class = "row-staff-total"  onclick="toggleGroup('group-dt-${team}', this)">
                     <td  class = "text-name" ><span class="toggle-icon">▶</span><strong>Cộng :${team}</strong></td>
                       ${Array( (gom_2.length * 2) + 1 ).fill().map((zz,vt) => {  return '<td>'+tongmang(nd,vt+2).toLocaleString('vi')+'</td>' }).join('') }
              </tr>`
              nd.forEach( dtvv => { 
                htt += `<tr class = "row-detail group-dt-${team} hidden">
                           <td  class = "text-name">${dtvv[1]}</td>
                           ${dtvv.slice(2).map((zb,zt)  => { return `<td >${ns(zb).toLocaleString('vi')}</td>` }).join('')}
                </tr>`
              })
        }




    return `<table id="debtTable">
            <thead>
                <tr>
                    <th  class = "text-name" >Tên khách hàng</th>
                    <th>Tổng</th>
                    ${gom_2.map(cot => `<th>${cot}</th><th>Tiền ${cot}</th>`).join('')}
                </tr>
            </thead>
            <tbody>${htt}
            </tbody>
            </table>`
    
     

}

function locdtxem(dt,l1,l2){
  var kq_kh = [] ; dt.forEach(r => {
      if(checkloc(l1,u(r[2])) == 'ok' && checkloc(l2,u(r[19])) == 'ok'){kq_kh.push(r)}
  })
  return kq_kh
}


function tinhdoanhthu(kq_kh,tt_nv,tt_kpi){
         var ds = [] , tb = '' , s1 = 0 , s2 = 0 , s3 = 0 , s4 = 0 , s5 = 0, gomdt = Object.groupBy(kq_kh , v => v[19] ) , gomnv = Object.groupBy(tt_nv , v => `${u(v[2]) !== '' ? 'Bỏ' : u(v[4]) }` ) , gomkpi = Object.groupBy(tt_kpi , v => u(v[0]) )
        for(const[nv,nd] of Object.entries(gomdt)){
             var idnv = gomnv[nv] == undefined ? 'Emty' : gomnv[nv][0][0]
             var team = idnv == 'Emty' ? 'Emty' : gomkpi[idnv] == undefined ? 'Emty' : gomkpi[idnv].sort((kn,km) => {return  gettime(km[2]) - gettime(kn[2]) })[0][4]
             var kpikhoan = idnv == 'Emty' ? 'Emty' : gomkpi[idnv] == undefined ? 'Emty' : gomkpi[idnv].sort((kn,km) => {return  gettime(km[2]) - gettime(kn[2]) })[0][3] 
             var nodk = tongmang(nd,3) ; s1 += nodk
             var phaithu = tongmang(nd,4) ; s2 += phaithu
             var tongthu = tongmang(nd,5) ; s3 += tongthu
             var coc = tongmang(nd,14) ; s4 += coc
             var dnck = nodk + phaithu - tongthu ; s5 += dnck // tongmang(nd,18) là theo cột còn lại
             // tính cuối kỳ : đầu kỳ + phải thu - tổng thu
             ds.push([  team , kpikhoan , nv , nodk , phaithu , tongthu , coc , dnck])
            }

         tb += `<tr class = "row-grand-total">
              <td   class = "text-name" ><strong>Tổng cộng :</strong></td>
              <td>${Number(s1).toLocaleString('vi')}</td>
              <td>${Number(s2).toLocaleString('vi')}</td>
               <td></td>
              <td>${Number(s3).toLocaleString('vi')}</td> 
               <td></td>
               <td></td>
               <td>${Number(s4).toLocaleString('vi')}</td> 
               <td>${Number(s5).toLocaleString('vi')}</td> 
         </tr>`

         var gds = Object.groupBy(ds , v => v[0] ) ; for(const[team,nd] of Object.entries(gds)){
              tb += `<tr class = "row-staff-total"  onclick="toggleGroup('group-ds-${team}', this)">
                     <td  class = "text-name" ><span class="toggle-icon">▶</span><strong>Cộng :${team}</strong></td>
                      <td>${Number(tongmang(nd,3)).toLocaleString('vi')}</td>
                      <td>${Number(tongmang(nd,4)).toLocaleString('vi')}</td>
                       <td></td>
                      <td>${Number(tongmang(nd,5)).toLocaleString('vi')}</td>
                       <td></td>
                       <td></td>
                       <td>${Number(tongmang(nd,6)).toLocaleString('vi')}</td>
                       <td>${Number(tongmang(nd,7)).toLocaleString('vi')}</td>
              </tr>`
              nd.forEach( vv => { 
                tb += `<tr class = "row-detail group-ds-${team} hidden">
                           <td  class = "text-name">${vv[2]}</td>
                            <td>${Number(vv[3]).toLocaleString('vi')}</td>
                            <td>${Number(vv[4]).toLocaleString('vi')}</td>
                            <td>${achiab(vv[4],vv[1])}</td>
                            <td>${Number(vv[5]).toLocaleString('vi')}</td>
                            <td>${vv[1]}</td>
                             <td>${achiab(vv[5],vv[1])}</td>
                               <td>${Number(vv[6]).toLocaleString('vi')}</td>
                               <td>${Number(vv[7]).toLocaleString('vi')}</td>
                </tr>`
              })
        }


            return tb
        }
function achiab(a,b){
     var sa = ns(a) , sb = ns(b) ; if(isNaN(sa) || isNaN(sb) ) return 'Không phải số'
     return (sa/sb*100).toFixed(2) + ' %'
}
function hienthi_kq(kq,dt,ds){
     nhapinner('kq',`
    <ul class="button-bar">
        <li class="btn-report active" onclick="openReport('cong-no', this)">
            Báo cáo công nợ
        </li>
        <li class="btn-report" onclick="openReport('doanh-so', this)">
            Báo cáo doanh số
        </li>
        <li class="btn-report" onclick="openReport('doanh-thu', this)">
            Báo cáo doanh thu
        </li>
    </ul>

    <div id="cong-no" class="report-content active">
         <div class="table-wrapper">
        <table id="debtTable">
            <thead>
                <tr>
                    <th  class = "text-name" >Tên khách hàng</th>
                    <th>Nợ đầu kỳ</th>
                    <th>Phải thu doanh số</th>
                    <th>Tổng thu</th>
                    <th>Thu trong hạn & < 30 ngày</th>
                    <th>Thu quá hạn 31-60 ngày</th>
                    <th>Thu quá hạn > 60 ngày</th>
                    <th>CN trong hạn</th>
                    <th>Tổng CN quá hạn</th>
                    <th>CN quá hạn < 30 ngày</th>
                    <th>CN quá hạn 31-60 ngày</th>
                    <th>CN quá hạn > 60 ngày</th>
                    <th>Khách cọc đơn</th>
                    <th>Chiết khấu</th>
                    <th>Vận chuyển</th>
                    <th>Tiền thuế GTGT</th>
                    <th>Còn lại</th>
                    <th>Nhân Viên</th>
                </tr>
            </thead>
            <tbody id="tableBody">${tinhmang_kqkh(kq)}</tbody>
        </table>
      </div>
    </div>

    <div id="doanh-so" class="report-content">
            <div class="table-wrapper">${ds}</div>
    </div>

    <div id="doanh-thu" class="report-content">
         <div class="table-wrapper">
        <table id="debtTable">
            <thead>
                <tr>
                    <th  class = "text-name" >Nhân Viên KD</th>
                    <th>Nợ đầu kỳ</th>
                    <th>Doanh số</th>
                    <th>Tỷ lệ doanh số đạt được</th>
                    <th>Doanh thu</th>
                    <th>KPI khoán</th>
                    <th>Tỷ lệ doanh thu đạt được</th>
                    <th>Khách Cọc</th>
                    <th>Dư nợ cuối kỳ</th>
                </tr>
            </thead>
            <tbody id="tableBody">${dt}</tbody>
        </table>
      </div>
    </div>`)
    }

    function openReport(reportId, element) {
            // 1. Ẩn tất cả các nội dung báo cáo
            var contents = document.getElementsByClassName('report-content');
            for (var i = 0; i < contents.length; i++) {
                contents[i].classList.remove('active');
            }

            // 2. Bỏ trạng thái active ở tất cả các nút
            var buttons = document.getElementsByClassName('btn-report');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('active');
            }

            // 3. Hiện nội dung tương ứng với ID được bấm
            document.getElementById(reportId).classList.add('active');

            // 4. Đổi màu nút vừa bấm thành active
            element.classList.add('active');
        }

   function tinhmang_kqkh(kq_kh){
  
         var gom = Object.groupBy(kq_kh,v => v[19]) , m = '' , stt = 0
         m += `<tr class = "row-grand-total">
              <td   class = "text-name" ><strong>Tổng cộng :</strong></td>
                ${Array(16).fill().map((zz,vt) => {  return '<td>'+tongmang(kq_kh,vt+ 3).toLocaleString('vi')+'</td>' }).join('') }
              <td></td>
         </tr>`

         for(const[nv,nd] of Object.entries(gom)){
          m += `<tr class = "row-staff-total"  onclick="toggleGroup('group-${stt}', this)">
              <td  class = "text-name" ><span class="toggle-icon">▶</span><strong>Cộng :${nv}</strong></td>
                ${Array(16).fill().map((zz,vt) => {  return '<td>'+tongmang(nd,vt+ 3).toLocaleString('vi')+'</td>' }).join('') }
              <td class = "text-left" >${nv}</td>
         </tr>`
               nd.forEach( vv => {
                m += `<tr class = "row-detail group-${stt} hidden">
                      ${vv.slice(2).map((zb,zt)  => { return  zt == vv.length - 3 ? `<td class = "text-left">${zb}</td>` 
                      : zt == 0 ? `<td  class = "text-name">${zb}</td>`
                      : `<td >${ns(zb).toLocaleString('vi')}</td>` }).join('') }
                </tr>`
               })
          stt++
         }


         return m
}

function checkloc(l,nd){
      if(l == '') return 'ok'
      var so = 0
      l.split(',').forEach(z => {
           var nv = z.trim().toUpperCase() ; if(nd.toUpperCase().indexOf(nv) >= 0){so++}
      })
      return so > 0 ? 'ok' : 'no'
}

    // 3. HÀM TOGGLE (ẨN/HIỆN)
    function toggleGroup(groupId, headerElement) {
        // Toggle class 'hidden' cho các dòng chi tiết
        const details = document.getElementsByClassName(groupId);
        for (let row of details) {
            row.classList.toggle('hidden');
        }
        // Toggle class 'open' cho dòng header để xoay mũi tên
        headerElement.classList.toggle('open');
      
     
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








function timkiem(loai){
      nhapinner('tim_kiem',`<table style = "width:100%">
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
                <td>
  
    <div class="select-container" id="box-1">
        
        <div class="select-btn" onclick="toggleMenu('box-1', event)">
            <span class="btn-text-placeholder">Chọn chi nhánh...</span>
            <span class="arrow-wrapper">▼</span>
        </div>

        <div class="list-items">
            <div class="dropdown-header">
                <div class="search-box">
                    <input type="text" placeholder="Tìm..." onkeyup="searchItem('box-1')" onclick="event.stopPropagation()">
                </div>
                <button class="clear-all-btn" onclick="clearAll('box-1', event)">Xóa hết</button>
            </div>
            <ul class="options-list">
            ${dschinhanh.map(cn => `<li class="item" onclick="toggleItem(this, 'box-1')">
                    <span class="checkbox"></span><span class="item-text">${u(cn) }</span>
              </li>`).join('')}
            </ul>
        </div>
    </div>
                </td>
            </tr>
            <tr>
                <td ${loai == 'dccn' ? 'colspan = "2"' : ''} >
                    
     <div class="select-container" id="box-2">
        <div class="select-btn" onclick="toggleMenu('box-2', event)">
            <span class="btn-text-placeholder">Chọn khách hàng...</span>
            <span class="arrow-wrapper">▼</span>
        </div>

        <div class="list-items">
            <div class="dropdown-header">
                <div class="search-box">
                    <input type="text" placeholder="Tìm..." onkeyup="searchItem('box-2')" onclick="event.stopPropagation()">
                </div>
                <button class="clear-all-btn" onclick="clearAll('box-2', event)">Xóa hết</button>
            </div>
            <ul class="options-list">
                
                 ${taolocds(dt,4).map(cn => `<li class="item" onclick="toggleItem(this, 'box-2')">
                  <span class="checkbox"></span><span class="item-text">${u(cn)}</span>
                  </li>`).join('')}
             </ul>
        </div>
    </div>
                </td>
                ${loai == 'dccn' ? '' : `<td>
               

    <div class="select-container" id="box-3">
        <div class="select-btn" onclick="toggleMenu('box-3', event)">
            <span class="btn-text-placeholder">Chọn Nhân viên kd...</span>
            <span class="arrow-wrapper">▼</span>
        </div>

        <div class="list-items">
            <div class="dropdown-header">
                <div class="search-box">
                    <input type="text" placeholder="Tìm..." onkeyup="searchItem('box-3')" onclick="event.stopPropagation()">
                </div>
                <button class="clear-all-btn" onclick="clearAll('box-3', event)">Xóa hết</button>
            </div>
            <ul class="options-list">
                
              ${taolocds(tt_nv,4).map(cn => `<li class="item" onclick="toggleItem(this, 'box-3')">
                <span class="checkbox"></span><span class="item-text">${u(cn)}</span>
                </li>`).join('')}
                </ul>
        </div>
    </div>
                </td>`}
               
                <td >
                    <button onclick="${loai == 'dccn' ? 'xemdccn()' : 'xembc()'} " class="btn btn-primary w-100 mt-2">BÁO CÁO</button>
                  
                </td>

            </tr>
        </table>`)
        

}
function xemdccn(){
     var tu = val('#a1',1) , den = val('#a2',1) , kq = [] 
         if(tu == '' || den == '') return alert('Vui lòng chọn khoảng thời gian!')
         var [y1,m1,d1] = tu.split('-') , [y2,m2,d2] = den.split('-')
         var n_t = new Date(y1,Number(m1)-1,d1,0,0,0).getTime() , n_d = new Date(y2,Number(m2)-1,d2,0,0,0).getTime() ; if(n_d < n_t) return alert('Ngày đến phải lớn hơn ngày từ!')
         var cn = xemchon('box-1') , kh = xemchon('box-2')
         if(kh.length == 0 ) return alert('Vui lòng chọn ít nhất 1 khách!')
         var gomdt = Object.groupBy(dt,r => r[4]) , chonkh = kh.map(v => {return gomdt[v] == undefined ? 'Emty' : gomdt[v][0][0] })
console.log({ tt_gach , tt_ghi })
        var gach =  tt_gach.filter(v => {
            var loc = cn.length == 0 ? 0 : cn.findIndex(kt => kt == u(v[0]))
            return loc >= 0 && chonkh.findIndex(bv => bv == v[5]) >= 0 && u(v[3]) == ''  ? true : false
        }).map( (r,stt) => {
             return [  '', u(r[4]) , 0 , ns(u(r[6]))  ]
         })


        var ghi =  tt_ghi.filter(v => {
            var loc = cn.length == 0 ? 0 : cn.findIndex(kt => kt == u(v[0]))
            return loc >= 0  && chonkh.findIndex(bv => bv == v[6]) >= 0 && u(v[3]) == ''   ? true : false
        }).map( (r,stt) => {
             return [ u(r[11]) , u(r[4]) , ns(u(r[15])) , 0 ]
         })

         console.log({gach,ghi})

         var kq = [] ; var gz =  Object.groupBy([].concat(ghi,gach),r => `${u(r[0])}<@>${u(r[1])}`) ; for(const[a,b] of Object.entries(gz)){
            var [s1,s2] = a.split('<@>') ; kq.push([s1,s2,tongmang(b,2),tongmang(b,3)])
         }
console.log(kq)
          var so = 0 , dauky = 0 , a1 = 0 , a2 = 0 , a3 = 0 , ar = [] , stt = 1 , sx = kq.sort( (za,zb) => {return gettime(u(za[1])) - gettime(u(zb[1])) } )

     sx.forEach(b => {
        var cn = gettime(u(b[1])) , ss = b[2] + b[3] ; so += ss ; if(cn < n_t){ dauky +=  ss  }
        if(cn >= n_t && cn <= n_d){ ar.push([ stt ,b[0],b[1],b[2]*-1,b[3] , so*-1  ]) ; stt++ }
        if(cn >= n_t && cn <= n_d){
          a1 += b[2]
          a2 += b[3]
        }
        if( cn <= n_d){a3 += ss}
    })

    var gomar = Object.groupBy(ar,ll => ll[1])
                          
     nhapinner('kq',`
          <div class="tb_dccn">
          <table>
               <thead>
                     <tr>
                         <th>Stt</th>	
                         <th>Số đơn hàng</th>	
                         <th>Ngày</th>	
                         <th>Giá trị đơn hàng</th>	
                         <th>Thanh toán</th>	
                         <th>Dư nợ</th>
                     </tr>
               </thead>
               <tbody>
                     <tr>
                        
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          ${ddso(dauky*-1)}
                     </tr>
                        ${ar.map(c => {
                            return `<tr>
                            <td>${c[0]}</td>
                            <td ${gomar[c[1]].length > 1 ? 'class = "nen_do"' : '' } >${c[1]}</td>
                            <td>${c[2]}</td>
                            ${ddso(c[3])}
                            ${ddso(c[4])}
                            ${ddso(c[5])}
                            </tr>`
                        }).join(' ')}
                           <tr>
                          <td></td>
                          <td>Tổng</td>
                          <td></td>
                          ${ddso(a1*-1)}
                          ${ddso(a2)}
                          ${ddso(a3*-1)}
                     </tr>
               </tbody>
              
        </table>
        </div>`)
          


}

function ddso(x){
      var l = Number(x) ; if(isNaN(l) == true) return `<td class = "text-vang" >${x}</td>`
      if(l < 0) return `<td class = "text-red" >${Number(l.toFixed(0)).toLocaleString('vi')}</td>`
      return `<td >${Number(l.toFixed(0)).toLocaleString('vi')}</td>`
}



// 1. Mở/Đóng Menu theo ID container
        function toggleMenu(containerId, event) {
            event.stopPropagation();
            
            var container = document.getElementById(containerId);
            var listItems = container.querySelector('.list-items');
            var btn = container.querySelector('.select-btn');

            // Đóng tất cả các menu khác đang mở (UX tốt hơn)
            closeAllMenus(containerId);

            if (listItems.style.display === "block") {
                listItems.style.display = "none";
                btn.classList.remove("open");
            } else {
                listItems.style.display = "block";
                btn.classList.add("open");
                // Focus vào ô input của menu này
                container.querySelector('input').focus();
            }
        }

        // Hàm phụ: Đóng hết menu, trừ cái đang bấm (nếu có)
        function closeAllMenus(exceptId = null) {
            var allContainers = document.querySelectorAll('.select-container');
            allContainers.forEach(function(cont) {
                if (exceptId && cont.id === exceptId) return; // Bỏ qua cái đang click
                
                cont.querySelector('.list-items').style.display = "none";
                cont.querySelector('.select-btn').classList.remove("open");
            });
        }

        // 2. Chọn item
        function toggleItem(itemElement, containerId) {
            itemElement.classList.toggle('checked');
            renderTags(containerId);
        }

        // 3. Render Tags (vẽ lại giao diện nút)
        function renderTags(containerId) {
            var container = document.getElementById(containerId);
            var checkedItems = container.querySelectorAll('.item.checked');
            var displayArea = container.querySelector('.select-btn');
            
            // Mảng chứa HTML của các tags
            var html = '';

            if (checkedItems.length > 0) {
                checkedItems.forEach(function(item) {
                    var text = item.querySelector('.item-text').innerText;
                    // Lưu ý: truyền cả text và containerId vào hàm xóa
                    html += `<span class="tag">${text} <span class="close-tag" onclick="removeTag('${text}', '${containerId}', event)">×</span></span>`;
                });
            } else {
                // Lấy placeholder gốc tùy theo hộp
                var placeholderText = "Chọn...";
                if(containerId === 'box-1') placeholderText = "Chọn chi nhánh...";
                if(containerId === 'box-2') placeholderText = "Chọn khách hàng...";
                if(containerId === 'box-3') placeholderText = "Chọn Nhân viên kd...";
                
                html = `<span class="btn-text-placeholder">${placeholderText}</span>`;
            }
            
            // Luôn thêm mũi tên ở cuối
            html += '<span class="arrow-wrapper">▼</span>';
            displayArea.innerHTML = html;
        }

        // 4. Xóa 1 tag
        function removeTag(textStr, containerId, event) {
            event.stopPropagation();
            var container = document.getElementById(containerId);
            var items = container.querySelectorAll('.item');

            // Tìm và bỏ check item tương ứng
            items.forEach(function(item) {
                var itemText = item.querySelector('.item-text').innerText;
                if (itemText === textStr) {
                    item.classList.remove('checked');
                }
            });
            renderTags(containerId);
        }

        // 5. Xóa hết
        function clearAll(containerId, event) {
            event.stopPropagation();
            var container = document.getElementById(containerId);
            var checkedItems = container.querySelectorAll('.item.checked');
            
            checkedItems.forEach(item => item.classList.remove('checked'));
            
            // Reset ô tìm kiếm của hộp này
            var input = container.querySelector('input');
            input.value = "";
            searchItem(containerId); // Gọi search để hiện lại list đầy đủ

            renderTags(containerId);
        }

        // 6. Tìm kiếm
        function searchItem(containerId) {
            var container = document.getElementById(containerId);
            var filter = container.querySelector('input').value.toUpperCase();
            var items = container.querySelectorAll('.item');

            items.forEach(function(item) {
                var txtValue = item.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        }

        // 7. Click ra ngoài thì đóng TẤT CẢ
        window.onclick = function(event) {
            if (!event.target.closest('.select-container')) {
                closeAllMenus();
            }
        }

        function doimk(){
          // Lấy phần tử theo ID
        var myModalEl = document.getElementById('modalDoiMatKhau');
        
        // Khởi tạo đối tượng Modal của Bootstrap 5
        var modal = new bootstrap.Modal(myModalEl);
        
        // Gọi lệnh hiển thị
        modal.show();
        }

        function tatmodal_show(){
        
    var myModalEl = document.getElementById('modalDoiMatKhau');
    
    // 1. Lấy lại đối tượng modal đang hoạt động (Không dùng 'new')
    var modal = bootstrap.Modal.getInstance(myModalEl);
    
    // 2. Kiểm tra nếu tìm thấy thì mới tắt
    if (modal) {
        modal.hide();
    } else {
        // Trường hợp modal chưa mở bao giờ hoặc lỗi
        console.log("Không tìm thấy modal đang mở");
    }

        }

         function luuMatKhau(){
             var nd = val('#mkmoi',1) ; if(nd.trim() == '') return alert('Chưa nhập mật khẩu mới!')
              var idnv = JSON.parse(user)['idnv'] ; if(u(idnv) == '') return alert('Chưa xác định được nhân viên!')
              let obj = { ht : 'doi_matkhau' , mk : nd , nv : idnv }
              momodal()
                tatmodal_show()
              fetch(api,{
method:"POST",
body:JSON.stringify(obj)
}).then(res => res.json())
  .then(dt => {
     console.log(dt)
        if(dt.tb == 'ok'){		    		
             tatmodal()
        }
            alert(dt.nd)
           
        
    })

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



