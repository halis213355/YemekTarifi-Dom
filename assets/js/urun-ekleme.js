document.addEventListener("DOMContentLoaded", function(event) {
    //console.clear();
    //console.log("DOMContentLoaded");
    let urunler= JSON.parse(localStorage.getItem("urunler"));
    if( urunler == null){
        urunler= [];
    }
    listele(urunler);
    // console.log(urunler);

    let btnUrunEkle=document.getElementById("btnUrunEkle");
    btnUrunEkle.addEventListener("click", function(){
        let urun_adi=document.getElementById("urun_adi").value;

        urun_adi=urun_adi.trim();
        //alert(urun_adi);
        let isAdded = urunler.includes(urun_adi);
        if (isAdded)
        {
            console.log("Bu ürün bulunmakta.");
        }
        else
        {
            urunler.unshift(urun_adi);
            localStorage.setItem("urunler",JSON.stringify(urunler));
            console.log(urunler);
            listele(urunler);
        }
    })

    let searchInput=document.getElementById("search");
    searchInput.addEventListener("input", function(evemt){

        let searchValue=this.value;
        let filtrelenmisUrunler= urunler.filter(function(urun , index , array){
            return urun.toLowerCase().includes(searchValue.toLowerCase());
        });
        listele(filtrelenmisUrunler);
    })

    document.body.addEventListener("click", function(event){
        let element=event.target;
        let elementIsDelete=element.className.includes("delete-product")

        if(elementIsDelete){
            let silinecekUrunId=element.id;
            urunler.splice(silinecekUrunId,1);
            listele(urunler);
            localStorage.setItem("urunler",JSON.stringify(urunler));
        }
    })
    function listele(urunler) {
        if(urunler==null || (Array.isArray(urunler) && urunler.length<1)){
            let lielement = document.createElement("li");
            lielement.className="list-group-item bg-warning text-white";
            lielement.textContent="Listede Bir ürün yok";
            let urunListesi= document.getElementById("urunListesi");
            urunListesi.innerHTML= "";
            urunListesi.appendChild(lielement);
        }
        else{
            urunListesi.innerHTML= "";
            urunler.forEach(function(urun, index, array){
            let lielement = document.createElement("li");
            lielement.className="list-group-item";
            lielement.textContent =urun;

            let iElement = document.createElement("i");
            iElement.className = "bi bi-trash float-end delete-product";
            iElement.id = index;

            urunListesi.appendChild(lielement);
            lielement.appendChild(iElement);

        })


    }

    }
})

