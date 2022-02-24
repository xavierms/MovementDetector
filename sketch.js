let knn,extractor, video
pos = 200

function setup() {
  createCanvas(390, 390);
  
  console.log(ml5.version)
  knn = ml5.KNNClassifier();
  extractor = ml5.featureExtractor('mobilenet', extractorListo)
  
  
video = createCapture(VIDEO).hide()
let bt1 = createButton('Izquierda')
let bt2 = createButton('Derecha')

background(0);

bt1.position(790, 590);
bt2.position(1045, 590);

bt1.mousePressed( ()=>{
 let izq = extractor.infer(video)
 knn.addExample(izq,"izquierda")
 
})

bt2.mousePressed( ()=>{
 let der = extractor.infer(video)
  knn.addExample(der,"derecha")
})
  
  
  
}


function extractorListo(){
  console.log('listo para dectectar imagenes')

}

function draw() {
  
  image(video,0,0, width, height)
  

  if(knn.getNumLabels() > 1){
    
    clasificar()
  
  }

  circle(pos,200,25)
  
}

function clasificar(){
    let img = extractor.infer(video)
     knn.classify(img, (err, res)=> {

       
       if (pos > 400 || pos < 0){pos = 200}
       
       if(res.label == 'izquierda'){
        pos = pos -1
         
       } else if(res.label == 'derecha'){
        pos = pos + 1 
       }
       console.log(res)
     }) 
  
}
