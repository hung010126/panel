
  let link = window.location.href ;
  let user = localStorage.dangnhap ;
  let timelog = localStorage.timelg ;
  let tk = '' , dt = [] , nv = [] , hm = [] , ghi = [] , gach = [] ; 
  
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
  .then(dt => {
    console.log(dt)
    if(dt.tb == 'ok'){
          dt = dt.dt
          nv = dt.nv 
          hm = dt.hm
          ghi =dt.ghi 
          gach = dt.gach
          nhapinner('kq',`<table id="dt_end" class="display bg-light" style="width:100%">                      
                                 <thead style="background:#4076fb"></thead>
                    </table>`)
    } else {
        alert(dt.tb+'\nVui lòng F5 sau ít phút!')
    }

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



