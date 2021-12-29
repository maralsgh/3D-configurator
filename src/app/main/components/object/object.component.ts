import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {
  OBJLoader
} from 'three/examples/jsm/loaders/ObjLoader';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ActivatedRoute, Params } from '@angular/router';
import { ModelService } from '../../services/model.service';
import { Models } from '../../models/Entity';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit , AfterViewInit{
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  scene : any = null;
  camera : any = null;
  mesh : any= null;
  controls: any = null;
  id: number = 0;
  loader : any;
  modelInfo : Models = {};
  enableZoom : boolean | undefined;
  autoRotate: boolean | undefined;

  constructor(private activatedRoute: ActivatedRoute , private models: ModelService) {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
    this.loader = new OBJLoader();

    this.controls = new OrbitControls(this.camera , this.renderer.domElement);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getData();
    });
  }

  ngOnInit() {
  }

  getData(){
    this.models.get().then(data => {
      this.modelInfo = data[this.id];
      this.enableZoom = data[this.id].controls.enableZoom;
      this.autoRotate = data[this.id].controls.autoRotate;
      this.createMesh();
      this.configControls();
    })
  }

  ngAfterViewInit(){
    this.configCamera();
    this.configRenderer();
    this.animate();
  }


  configCamera() {
    this.camera.position.z = 2;
  }

  configRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
    if(window.innerWidth >= 767){
      this.renderer.setSize(window.innerWidth - 300, window.innerHeight);
    }else{
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    this.renderer.shadowMap.enabled = true
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  configControls() {
    this.controls.autoRotate = this.autoRotate;
    this.controls.enableZoom = this.enableZoom;
    this.controls.enablePan  = this.modelInfo?.controls?.enablePan;
    this.controls.update();
  }

  remove(){
    const selectedObject = this.scene.getObjectByName(name);
    this.scene.clear(selectedObject)
  }

  createMesh() {
    this.loader.load( `./assets/models/${this.modelInfo?.obj}`,  ( obj: any) => {
        this.remove();
        this.scene.add(obj);
      const light = new THREE.DirectionalLight(0xffffff , 1.0);
      light.position.set(100, 0, 100).normalize();
      this.scene.add( light );

    })


  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  changeControlRotate(b: boolean) {
    this.configControls();
  }
}
