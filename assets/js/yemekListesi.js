document.addEventListener("DOMContentLoaded", function(event){
    let foodList= document.getElementById("foodlist");
    let completedListElement= document.getElementById("completedlist");
    let yemekListesi =JSON.parse(localStorage.getItem("yemek_listesi"));

    if(yemekListesi== null){
        yemekListesi=[];
    }

    let complatedList =JSON.parse(localStorage.getItem("completed_list"));

    if(complatedList== null){
        complatedList=[];
    }
    listele(yemekListesi,foodList,true);
    listele(complatedList,completedListElement);

    document.body.addEventListener("click",function(event){
        let element=event.target;
        let elementDeleteFood=element.className.includes("delete-food");
        let elementCompletedFood=element.className.includes("completed-food");

        if (elementDeleteFood){
            let yemekID= element.getAttribute( "data-id");
            let yemek=yemekListesi[yemekID];

            Swal.fire({
              title: yemek.yemekAdi + " yemeği silinsin mi?" ,
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Evet",
              denyButtonText: `Hayır`,
              cancelButtonText:"İptal"
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                yemekListesi.splice(yemekID,1);
                localStorage.setItem("yemek_listesi", JSON.stringify(yemekListesi));
                listele(yemekListesi,foodList,true);
                Swal.fire({
                    title:'İşlem Başarılı',
                    text:'Yemek Silindi',
                    confirmButtonText:'Tamam'
                })
              } else if (result.isDenied) {
                Swal.fire({
                    title:'İşlem Başarısız',
                    text:'Yemek Silinmedi',
                    confirmButtonText:'Tamam'
                });
              }
            });
        }
        if (elementCompletedFood){
            let yemekID= element.getAttribute( "data-id");
            let yemek=yemekListesi[yemekID];

            Swal.fire({
              title: yemek.yemekAdi + " yemek yapıldı olarak işaretlensin mi?" ,
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Evet",
              denyButtonText: `Hayır`,
              cancelButtonText:"İptal"
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {

                let newCompleted=yemekListesi.splice(yemekID,1);
                complatedList=complatedList.concat(newCompleted);

                localStorage.setItem("completed_list",JSON.stringify(complatedList));
                localStorage.setItem("yemek_listesi", JSON.stringify(yemekListesi));

                listele(yemekListesi,foodList);
                listele(complatedList,completedListElement);

                Swal.fire({
                    title:'İşlem Başarılı',
                    text:'Yemek İşaretlendi',
                    confirmButtonText:'Tamam'
                })
              } else if (result.isDenied) {
                Swal.fire({
                    title:'İşlem Başarısız',
                    text:'Yemek İşaretlenmedi',
                    confirmButtonText:'Tamam'
                });
              }
            });
        }
    })
    function listele(yemekler,listElement,buttonStatus=false) {
        listElement.innerHTML = "";
        if(yemekler.length<1)   {
            listElement.innerHTML ="Listede Eleman Yok";

        }
        else{
            yemekler.forEach(function(val,index,arr){
                let satirElement=document.createElement("div");
                satirElement.className= "col-md-6 mt-4";

                let cardElement=document.createElement("div");
                cardElement.className= "card";

                let cardheaderElement=document.createElement("h5");
                cardheaderElement.className= "card-header";
                cardheaderElement.innerHTML= `<strong>Yemek Adi: <strong>${val.yemekAdi}`;

                let cardBodyElement=document.createElement("div");
                cardBodyElement.className= "card-body";

                let contentElement=document.createElement("div");
                contentElement.className= "content";

                let contentTitle = document.createElement("h5");
                contentTitle.textContent= "İçindekiler";

                let ulContentListElement = document.createElement("ul");
                ulContentListElement.className= "icerik-listesi";
                val.icindekiler.forEach(function(urun){
                    let liElement = document.createElement("li");
                    liElement.className= "d-flex justify-content-between";
                    liElement.textContent=urun.name +":"+ urun.miktar;
                    ulContentListElement.appendChild(liElement);
                })

                contentElement.appendChild(contentTitle);
                contentElement.appendChild(ulContentListElement);

                let recipeElement=document.createElement("div");
                recipeElement.className= "recipe";

                let recipeTitle=document.createElement("h6");
                recipeTitle.textContent= "Tarif:";

                let recipeDetail = document.createElement("p");
                recipeDetail.textContent=val.yemekTarif;

                recipeElement.appendChild(recipeTitle);
                recipeElement.appendChild(recipeDetail);

                cardBodyElement.appendChild(recipeElement);
                cardBodyElement.appendChild(contentElement);

                let footerElement=document.createElement("div");
                footerElement.className= "card-footer d-flex justify-content-between";




                cardElement.appendChild(cardheaderElement);
                cardElement.appendChild(cardBodyElement);


                satirElement.appendChild(cardElement);
                listElement.appendChild(satirElement);

                if (buttonStatus){
                    let btnSil=document.createElement("button");
                    btnSil.className= "btn btn-danger col me-5 delete-food";
                    btnSil.textContent="Sil";
                    btnSil.setAttribute("data-id",index);

                    let btnYapildi=document.createElement("button");
                    btnYapildi.className="btn btn-success col completed-food";
                    btnYapildi.textContent="Yapildi";
                    btnYapildi.setAttribute("data-id",index);
                    footerElement.appendChild(btnSil);
                    footerElement.appendChild(btnYapildi);
                    cardElement.appendChild(footerElement);
                }



            })
        }
    }




});