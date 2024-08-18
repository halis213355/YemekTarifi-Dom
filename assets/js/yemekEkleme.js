

document.addEventListener("DOMContentLoaded",function (event){
    let yemek_adi= document.getElementById("yemek_adi");
    let yemekTarifi = document.getElementById("yemekTarifi");
    let yemekBaslik=document.getElementById("yemekBaslik");
    let tarifDetay = document.getElementById("tarifDetay");
    let icerik_listesi=document.getElementById("icerik_listesi")
    let urunListesi=document.getElementById("urunListesi")
    let btnKaydet=document.getElementById("btnKaydet");

    let urunler= JSON.parse(localStorage.getItem("urunler"));
    let yemekListesi = JSON.parse(localStorage.getItem("yemek_listesi"));
    let yemekMalzemesi= JSON.parse(localStorage.getItem("yemekMalzemesi"));
    let search_yemek = document.getElementById("search_yemek");


    let yemek={
        yemekAdi:"",
        yemekTarif:"",
        icindekiler: [],

    }
    let icindekiler=[];

    if (yemekMalzemesi==null){
        yemekMalzemesi=[];
    }

    if (urunler==null){
        urunler=[];
    }
    if (yemekListesi==null){
        yemekListesi=[];
    }

    listele(urunler)


    yemek_adi.addEventListener("input", function(eventYAdi){
        let name=this.value;

        if(name.length>1){
            yemekBaslik.textContent = name;
        }
        else{
            yemekBaslik.textContent = "Yemek Başlığı";
        }
        yemek.yemekAdi= name;

    })
    yemekTarifi.addEventListener("input", function(eventYTarifi){
        let name=this.value;
        if(name.length>1){
            tarifDetay.textContent=name;
        }
        else{
            tarifDetay.textContent="Yemek Tarifi"
        }
        yemek.yemekTarif= name;

    })
    search_yemek.addEventListener("input",function (eventSearch) {
        let search_value = this.value;
        let filtrelenmisUrunler= urunler.filter(function (urun , index , array){
            return urun.toLowerCase().includes(search_value.toLowerCase());
        })
        listele(filtrelenmisUrunler);

    })
    document.body.addEventListener("click", function(eventProduct){

        let element=eventProduct.target;
        let elementIsProductAdd=element.className.includes("bi-plus-lg");
        let elementIsProductDelete = element.className.includes("delete-product-content");

        let urunAdi=false;

        if(elementIsProductAdd &&
            idExistsUrunler(element.id) &&
            (urunAdi = urunler[element.id]) &&
            !isNameExistsIcindekiler(urunAdi)
        )
        {
            console.log(urunAdi)
            let product={
                id:element.id,
                miktar:"",
                name:urunAdi,
            }

            icindekiler.unshift(product);
            urunIcerigiListele(icindekiler);
            yemek.icindekiler=icindekiler;

            let parentli=element.parentElement;
            parentli.style.textDecoration="line-through";
            element.style.pointerEvents="none";
            element.style.opacity="0.5";

        }

        if (elementIsProductDelete &&
            element.hasAttribute("data-id") &&
            (elementID = element.getAttribute("data-id")) &&
            !idExistsUrunler(element.id) &&
            (urunAdi = urunler[elementID]) &&
            isNameExistsIcindekiler(urunAdi)

        ){
            icindekiler= icindekiler.filter(product => product.name !== urunAdi)
            urunIcerigiListele(icindekiler);

            yemek.icindekiler = icindekiler;

            let iElement=document.getElementById(elementID);
            iElement.style.pointerEvents="auto";
            iElement.style.opacity="1";

            let parentLi=iElement.parentElement;
            parentLi.style.textDecoration="none";
        }

    });
    icerik_listesi.addEventListener("input",function (eventInput) {
        var degişenElement=eventInput.target;


        if (degişenElement.classList.contains("miktar")){
            console.log("");
            let miktarUrunId = degişenElement.getAttribute("data-id");
            icindekiler.find(function(item){
                if (item.id === miktarUrunId) {
                    item.miktar = degişenElement.value;

                    console.log(item);
                }
            })


        }
    })
    btnKaydet.addEventListener("click",function () {
        if (!yemekBaslikKontrol()){

            yemekListesi.push(yemek);

            localStorage.setItem("yemek_listesi", JSON.stringify(yemekListesi));
            Swal.fire({
              title: "İşlem Başarılı !",
              text: "Yemek Eklendi !",
              icon: "success",
              confirmButtonText: "Tamam"
            });
        }
        else{
            Swal.fire({
              icon: "warning",
              title: "İşlem Başarısız",
              text: "Yemek daha önce eklenmiş!",
              confirmButtonText: "Tamam"

            });
        }

    })

    function idExistsUrunler(id){
        return urunler[id] !== undefined
    }
    function isNameExistsIcindekiler(name) {

        return icindekiler.find(item => item.name === name) !== undefined ;
    }
    function yemekBaslikKontrol() {
        return yemekListesi.find(item => item.yemekAdi === yemek.yemekAdi) !== undefined ;
    }
    
    function urunIcerigiListele(urunler) {
        if(urunler==null || (Array.isArray(urunler) && urunler.length<1)){
            let lielement = document.createElement("li");
            lielement.className="list-group-item bg-warning text-white";
            lielement.textContent="Listede Bir ürün yok";

            icerik_listesi.innerHTML= "";
            icerik_listesi.appendChild(lielement);
        }
        else{
            icerik_listesi.innerHTML= "";
            urunler.forEach(function(urun, index, array){

                let liElement= document.createElement("li");
                liElement.className=" d-flex justify-content-between justify-content-between";

                let spanElement=document.createElement("span");

                let iElement=document.createElement("i");
                iElement.className="bi bi-trash delete-product-content";
                iElement.setAttribute("data-id",urun.id);

                let labelElement=document.createElement("label");
                labelElement.setAttribute("for","miktar-"+urun.id)
                labelElement.textContent=urun.name;

                spanElement.appendChild(iElement);
                spanElement.appendChild(labelElement);

                let inputElement=document.createElement("input");

                inputElement.placeholder="miktar";
                inputElement.className="float-end border-0 border-bottom border-black miktar";
                inputElement.id="miktar-"+urun.id;
                inputElement.setAttribute("data-id",urun.id);

                liElement.appendChild(spanElement);
                iElement.appendChild(inputElement);
                icerik_listesi.appendChild(liElement);
            })


        }
    }
    function listele(urunler) {
        if(urunler==null || (Array.isArray(urunler) && urunler.length<1)){
            let lielement = document.createElement("li");
            lielement.className="list-group-item bg-warning text-white";
            lielement.textContent="Listede Bir ürün yok";

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
            iElement.className = "bi bi-plus-lg float-end delete-product";
            iElement.id = index;

            urunListesi.appendChild(lielement);
            lielement.appendChild(iElement);

            })


    }

    }
})