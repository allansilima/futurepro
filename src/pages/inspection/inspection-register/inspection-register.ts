import { Component, OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams } from 'ionic-angular';
import { BaseFormPage } from '../../../shared/base-form/base.form.page';
import { FormBuilder, Validators } from '@angular/forms';
import { DataUtilsProvider } from '../../../providers/data-utils/data-utils';
import { ToastProvider } from '../../../providers/toast/toast';
import { UserProvider } from '../../../providers/user/user';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertProvider } from '../../../providers/alert/alert';
import { MediaFile, MediaCapture, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { State } from '../../../shared/models/state';
import { EmitterOrgan } from '../../../shared/models/emitterOrgan';
import { HomePage } from '../../home/home';
import { Brand } from '../../../shared/models/brand';
import { BrandProvider } from '../../../providers/brand/brand';
import { Model } from '../../../shared/models/model';
import { ModelProvider } from '../../../providers/model/model';
import { YearFuel } from '../../../shared/models/yearFuel';
import { YearFuelProvider } from '../../../providers/year-fuel/year-fuel';
import { PriceProvider } from '../../../providers/price/price';
import { Price } from '../../../shared/models/price';
import { Account } from '../../../shared/models/account';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { FileProvider } from '../../../providers/file/file';
import { Photo } from '../../../shared/models/photo';
import { TypeVehicle } from '../../../shared/models/typeVehicle';
import { TypeVehicleGroup } from '../../../shared/models/typeVehicleGroup';
import { Utilization } from '../../../shared/models/utilization';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { FeeProvider } from '../../../providers/fee/fee';
import { Media } from '../../../shared/models/media';
import { Inspection } from '../../../shared/models/inspection';
import { InspectionConfirmPage } from '../inspection-confirm/inspection-confirm';
import { ZipeCodeProvider } from '../../../providers/zip-code/zip-code';
import { ModelVehicle } from '../../../shared/models/modelVehicle';
import { BrandVehicle } from '../../../shared/models/BrandVehicle';
import { IonicSelectableComponent } from 'ionic-selectable';
import { YearFuelVehicle } from '../../../shared/models/yearFuelVehicle';
import { Associated } from '../../../shared/models/associated';
import { Inspector } from '../../../shared/models/inspector';
import { Contract } from '../../../shared/models/contract';
import { take } from 'rxjs/operators';
import { CreateAccountPage } from '../../account/create-account/create-account';
import { User } from '../../../shared/models/user';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-inspection-register',
  templateUrl: 'inspection-register.html',
})
export class InspectionRegisterPage extends BaseFormPage implements OnDestroy {

  inspection: Inspection = new Inspection;
  userAuthenticated: User = null;
  mediaFiles: MediaFile[] = [];
  states: State[] = [];
  emittersOrgans: EmitterOrgan[] = [];
  typesVehiclesGroup: TypeVehicleGroup[] = [];
  utilizations: Utilization[] = [];
  typesVehicles: TypeVehicle[] = [];
  brands: Brand[] = [];
  brandsVehicle: BrandVehicle[] = [];
  models: Model[] = [];
  modelsVehicle: ModelVehicle[] = [];
  yearsFuels: YearFuel[] = [];
  yearsFuelsVehicle: YearFuelVehicle[] = [];
  prices: Price = null;
  cities: any[] = [];
  plans: any[] = [];
  inputValue: string;
  monthlyValue: string;
  selectedPlan: boolean = false;
  selectedVehicleType: string;
  photos: Photo[] = [];
  media: Media[] = [];
  documentsPhotos: Photo[] = [];
  carFrontPhotos: Photo[] = [];
  carSidePhotos: Photo[] = [];
  carRearPhotos: Photo[] = [];
  carTirePhotos: Photo[] = [];
  carInternalPhotos: Photo[] = [];
  motorcycleFrontPhotos: Photo[] = [];
  motorcycleSidePhotos: Photo[] = [];
  motorcycleRearPhotos: Photo[] = [];
  motorcycleTirePhotos: Photo[] = [];
  motorcycleInternalPhotos: Photo[] = [];
  pickupFrontPhotos: Photo[] = [];
  pickupSidePhotos: Photo[] = [];
  pickupRearPhotos: Photo[] = [];
  pickupTirePhotos: Photo[] = [];
  pickupInternalPhotos: Photo[] = [];
  signaturePhoto: Photo[] = [];
  maskCpfCnpj: string = '000.000.000-99';
  cpfCnpj: string = '';

  slideOpts = {
    effect: 'flip'
  };

  photoOptions: CameraOptions = {
    quality: 90,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    targetWidth: 900,
    targetHeight: 900
  };

  @ViewChild('typeVehicleSlides') typeVehicleSlides: Slides;
  @ViewChild('planSlides') planSlides: Slides;

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private dataUtis: DataUtilsProvider,
    private toastCtrl: ToastProvider,
    private userProvider: UserProvider,
    private loadingCtrl: LoadingProvider,
    private alertCtrl: AlertProvider,
    private brandProvider: BrandProvider,
    private modelProvider: ModelProvider,
    private yearFuelProvider: YearFuelProvider,
    private priceProvider: PriceProvider,
    private feeProvider: FeeProvider,
    private camera: Camera,
    private mediaCapture: MediaCapture,
    private streamingMedia: StreamingMedia,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private fileProvider: FileProvider,
    private zipCodeProvider: ZipeCodeProvider,
    private storage: Storage) {

    super();
    this.createForm();
  }

  ionViewCanEnter() {
    this.storage.get('user').then(value => {
      this.userAuthenticated = JSON.parse(JSON.stringify(value));
      if (this.userAuthenticated && this.userAuthenticated.active == 0) {
        this.navCtrl.setRoot(HomePage);
        this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, `Sua Conta não está ativa e não poderá realizar esta operação.`);
      }
    })
      .catch(error => {
        console.log(error);
        this.navCtrl.setRoot(HomePage);
      });
  }

  ionViewDidLoad() {
    this.getStates();
    this.getEmittersOrgans();
    this.getTypesVehiclesGroup();
    this.getPhotos();
    this.getUtilizations();
    this.setValues();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      status: [null, [Validators.required, Validators.maxLength(20)]],
      myAccount: [null, Validators.required],
      utilization: [null, Validators.required],
      typeVehicle: [null, Validators.required],
      brand: [null, Validators.required],
      model: [null, Validators.required],
      yearFuel: [null, Validators.required],
      plate: [null, [Validators.required, Validators.maxLength(8)]],
      chassis: [null, [Validators.required, Validators.maxLength(30)]],
      renavam: [null, [Validators.required, Validators.maxLength(15)]],
      color: [null, [Validators.required, Validators.maxLength(50)]],
      plan: [null, [Validators.required]],
      inputValue: [null, [Validators.required]],
      monthlyValue: [null, Validators.required],
      feeValue: [null, Validators.required],
      readAndAgree: [null, Validators.required],
      media: [null],
      associated: this.formBuilder.group({
        id: [null],
        cpfCnpj: [null, [Validators.required, Validators.maxLength(18)]],
        name: [null, [Validators.required, Validators.maxLength(255)]],
        fantasy: [null, Validators.maxLength(255)],
        type: [null, Validators.maxLength(2)],
        rg: [null, Validators.maxLength(20)],
        emitterOrgan: [null, Validators.required],
        emitterOrganState: [null, Validators.required],
        cnh: [null, Validators.maxLength(20)],
        categoryCnh: [null, Validators.maxLength(2)],
        birthdate: [null, Validators.required],
        phone: [null, Validators.required],
        cellphone1: [null],
        cellphone1Whatsapp: [false],
        cellphone2: [null],
        cellphone2Whatsapp: [false],
        email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
        genre: [null, Validators.required],
        address: this.formBuilder.group({
          zipcode: [null, [Validators.required, Validators.maxLength(10)]],
          address: [null, [Validators.required, Validators.maxLength(255)]],
          number: [null, [Validators.required, Validators.maxLength(5)]],
          complement: [null, Validators.maxLength(255)],
          district: [null, [Validators.required, Validators.maxLength(255)]],
          city: [null, Validators.required],
          state: [null, Validators.required]
        })
      }),
      inspector: this.formBuilder.group({
        name: [null, [Validators.required, Validators.maxLength(255)]],
        login: [null, [Validators.required, Validators.maxLength(255)]],
        email: [null, [Validators.required, Validators.maxLength(255)]]
      }),
      contract: this.formBuilder.group({
        id: [null],
        dueDay: [null, Validators.required],
        inclusionDate: [null],
        value: [null],
        status: [null]
      })
    })
  }

  setValues() {
    if (this.navParams.get('inspection') == null || this.navParams.get('inspection') == undefined) {
      this.form.patchValue({
        status: 'analysis',
        utilization: 'Passeio',
        myAccount: false,
        associated: new Associated(),
        inspector: new Inspector(),
        contract: new Contract()
      });

      this.storage.get('user').then(value => {
        this.userAuthenticated = JSON.parse(JSON.stringify(value));
        this.form.get('inspector').patchValue({
          name: this.userAuthenticated.name,
          login: this.userAuthenticated.login,
          email: this.userAuthenticated.email
        });
      })
        .catch(error => {
          console.log(error);
          this.userAuthenticated = null;
        });
    }

    if (this.navParams.get('inspection') != null && this.navParams.get('inspection') != undefined) {
      this.inspection = this.navParams.get('inspection');
      this.form.patchValue(JSON.parse(JSON.stringify(this.inspection)));

      if (this.navParams.get('photos') != null && this.navParams.get('photos') != undefined) {
        this.photos = this.navParams.get('photos');
        this.setPictureAll(this.photos);
      }

      if (this.navParams.get('mediaFiles') != null && this.navParams.get('mediaFiles') != undefined) {
        this.mediaFiles = this.navParams.get('mediaFiles');
      }
    }

    if ((this.navParams.get('cpfCnpj') != null && this.navParams.get('cpfCnpj') != undefined)
      && (this.navParams.get('inspection') == null || this.navParams.get('inspection') == undefined)) {
      this.cpfCnpj = this.navParams.get('cpfCnpj');
      this.findByCpfCnpj();

      if (this.userAuthenticated.document_cpf == this.cpfCnpj) {
        this.form.patchValue({
          myAccount: true
        });
      } else {
        this.form.patchValue({
          myAccount: false
        });
      }
    }
  }

  submit() {
    console.log('Submit inspection...');
  }

  findByCpfCnpj() {
    this.userProvider.findByCpfCnpj(this.cpfCnpj)
      .pipe(take(1))
      .subscribe(
        response => {
          if (response['status'] == 'SUCCESS') {
            this.form.get('associated').patchValue({
              name: response['data'].name,
              cpfCnpj: this.cpfCnpj,
              email: response['data'].email,
              type: response['data'].type,
              gender: response['data'].gender,
              birthdate: response['data'].birthdate,
              address: {
                zipcode: response['data'].zipcode,
                address: response['data'].address,
                number: response['data'].address_number,
                district: response['data'].district,
                city: response['data'].city,
                state: response['data'].state
              }
            });
          }
        },
        error => {
          this.resetAssociated();
          return;
        }
      );
  }

  resetAssociated() {
    this.form.get('associated').patchValue({
      name: null,
      email: null,
      type: null,
      gender: null,
      address: {
        zipcode: null,
        address: null,
        number: null,
        district: null,
        city: null,
        state: null,
      }
    });
  }

  getStates() {
    this.dataUtis.getStates()
      .pipe(take(1))
      .subscribe(states => this.states = states);
  }

  getEmittersOrgans() {
    this.dataUtis.getEmittersOrgans()
      .pipe(take(1))
      .subscribe(emittersOrgans => this.emittersOrgans = emittersOrgans);
  }

  getUtilizations() {
    this.dataUtis.getUtilizations()
      .pipe(take(1))
      .subscribe(utilizations => this.utilizations = utilizations);
  }

  getTypesVehiclesGroup() {
    this.typesVehiclesGroup = [
      {
        'group': 1,
        'typesVehicles': [
          {
            'id': 1,
            'name': 'Carro e Pickups',
            'code': '1',
            'src': 'assets/imgs/typesVehicles/car.svg',
            'selected': false
          },
          {
            'id': 2,
            'name': 'Moto',
            'code': '2',
            'src': 'assets/imgs/typesVehicles/motorcycle.svg',
            'selected': false
          },
          {
            'id': 3,
            'name': 'Caminhões',
            'code': '3',
            'src': 'assets/imgs/typesVehicles/truck.svg',
            'selected': false
          }
        ]
      }
      /*      ,
            {
              'group': 2,
              'typesVehicles': [
                {
                  'id': 4,
                  'name': 'Vans',
                  'code': '3',
                  'src': 'assets/imgs/typesVehicles/van.svg',
                  'selected': false
                },
                {
                  'id': 5,
                  'name': 'Pesados',
                  'code': '3',
                  'src': 'assets/imgs/typesVehicles/truck.svg',
                  'selected': false
                }
              ]
            }
      */
    ]
  }

  getBrands(typeVehicle: any) {
    this.setSelectedVehicleType(typeVehicle);
    this.brands = [];
    this.brandsVehicle = [];
    this.models = [];
    this.yearsFuels = [];
    this.yearsFuelsVehicle = [];
    this.prices = null;
    this.setValuePlan(null, null);
    this.form.patchValue({
      brand: '',
      model: '',
      yearFuel: '',
      feeValue: null
    });
    this.loadingCtrl.present();
    this.brandProvider.getBrands(typeVehicle.code).pipe(take(1)).subscribe(
      brands => {
        this.brands = brands['data'];
        this.setBrandsVehicle();
      });
    this.loadingCtrl.dismiss();
  }

  getModels(event: { component: IonicSelectableComponent, value: any }) {
    this.models = [];
    this.modelsVehicle = [];
    this.yearsFuels = [];
    this.yearsFuelsVehicle = [];
    this.prices = null;
    this.setValuePlan(null, null);
    this.form.patchValue({
      model: '',
      yearFuel: '',
      feeValue: null
    });

    let brand_code = event.value.brand_code;
    if (brand_code != null && brand_code != '') {
      this.loadingCtrl.present();
      this.modelProvider.getModels(brand_code).pipe(take(1)).subscribe(
        models => {
          this.models = models['data'];
          this.setModelsVehicle();
        });
      this.loadingCtrl.dismiss();
    }
  }

  getYearsFuels(event: { component: IonicSelectableComponent, value: any }) {
    this.yearsFuels = [];
    this.yearsFuelsVehicle = [];
    this.prices = null;
    this.setValuePlan(null, null);
    this.form.patchValue({
      yearFuel: '',
      feeValue: null
    });

    let model_code = event.value.model_code;
    if (model_code != null && model_code != '') {
      this.loadingCtrl.present();
      this.yearFuelProvider.getYearsFuels(model_code).pipe(take(1)).subscribe(
        yearsFuels => {
          this.yearsFuels = yearsFuels['data'];
          this.setYearsFuelsVehicle();
        });
      this.loadingCtrl.dismiss();
    }
  }

  getPrices(event: { component: IonicSelectableComponent, value: any }) {
    this.prices = null;
    let yearFuel = this.getYearFuelById(event.value.id);
    if (yearFuel != null) {
      this.loadingCtrl.present();
      this.setFee(yearFuel);
      this.priceProvider.getPrices(yearFuel).pipe(take(1)).subscribe(
        prices => {
          if (prices['data'] == 'cobertura indisponível para este modelo') {
            this.alertCtrl.presentAlert('Ops!', '', 'Modelo não aceito pela associação.');
          } else {
            this.prices = prices['data'];
            this.getPlans(prices);
          }
        });
      this.loadingCtrl.dismiss();
    }
  }

  setSelectedVehicleType(typeVehicle: TypeVehicle) {
    this.typesVehiclesGroup.forEach(group => {
      group.typesVehicles.forEach(type => {
        if (type.name == typeVehicle.name) {
          typeVehicle.selected = true;
          this.form.patchValue({
            typeVehicle: typeVehicle.name
          });

        } else {
          type.selected = false;
        }
      });
    });
  }

  getPlans(prices: Price) {
    this.plans = [
      {
        'name': 'OURO',
        'anchor': 'assets/imgs/plans/gold.svg',
        'selected': false,
        'price': prices.plans.gold.price,
        'feeValue': this.form.get('feeValue').value,
        'coverage': `${prices.plans.gold.text.coverage.replace(/\|/g, '\n')}`,
        'assistance': `${prices.plans.gold.text.assistance.replace(/\|/g, '\n')}`,
        'benefits': `${prices.plans.gold.text.benefits.replace(/\|/g, '\n')}`,
        'images': [
          { 'name': 'Guincho Ilimitado', 'src': 'assets/imgs/plans/roadside_assistance.svg' },
          { 'name': 'Proteção Total', 'src': 'assets/imgs/plans/accident_insurance.svg' },
          { 'name': 'Carro Reserva', 'src': 'assets/imgs/plans/auto_insurance.svg' }
        ]
      },

      {
        'name': 'PRATA',
        'anchor': 'assets/imgs/plans/silver.svg',
        'selected': false,
        'price': prices.plans.silver.price,
        'feeValue': this.form.get('feeValue').value,
        'coverage': `${prices.plans.silver.text.coverage.replace(/\|/g, '\n')}`,
        'assistance': `${prices.plans.silver.text.assistance.replace(/\|/g, '\n')}`,
        'benefits': `${prices.plans.silver.text.benefits.replace(/\|/g, '\n')}`,
        'images': [
          { 'name': 'Guincho Ilimitado', 'src': 'assets/imgs/plans/roadside_assistance.svg' },
          { 'name': 'Proteção Roubo', 'src': 'assets/imgs/plans/theft_vandalism_insurance.svg' },
          { 'name': 'Carro Reserva', 'src': 'assets/imgs/plans/auto_insurance.svg' }
        ]
      },

      {
        'name': 'BRONZE',
        'anchor': 'assets/imgs/plans/bronze.svg',
        'selected': false,
        'price': prices.plans.bronze.price,
        'feeValue': this.form.get('feeValue').value,
        'coverage': `${prices.plans.bronze.text.coverage.replace(/\|/g, '\n')}`,
        'assistance': `${prices.plans.bronze.text.assistance.replace(/\|/g, '\n')}`,
        'benefits': `${prices.plans.bronze.text.benefits.replace(/\|/g, '\n')}`,
        'images': [
          { 'name': 'Colisão', 'src': 'assets/imgs/plans/collision_insurance.svg' },
          { 'name': 'Proteção Roubo', 'src': 'assets/imgs/plans/theft_vandalism_insurance.svg' },
          { 'name': 'Assitência 24h', 'src': 'assets/imgs/plans/car_towing_coverage.svg' }
        ]
      }
    ];
  }

  setFee(yearFuel: any) {
    let utilization = this.form.get('utilization').value;
    let special = false;

    if (utilization !== 'Passeio') {
      special = true;
    }

    this.feeProvider.getFee(yearFuel, special).pipe(take(1)).subscribe(
      feeValue => {
        this.form.patchValue({
          feeValue: feeValue.fee
        });
      }
    );
  }

  setSelectedPlan(planVehicle: any) {
    this.plans.forEach(plan => {
      if (plan.name == planVehicle.name) {
        plan.selected = true;
        this.form.patchValue({
          plan: plan.name,
          inputValue: plan.price,
          ///////////////   CONFIRMAR A MENSALIDADE  ////////////////////////////////
          monthlyValue: plan.price
        });
      } else {
        plan.selected = false;
      }
    });
  }

  getPhotos() {
    this.documentsPhotos = [
      {
        'position': 0,
        'name': 'voucher_address',
        'description': 'Comprovante endereço',
        'selected': false,
        'src': 'assets/imgs/documents/voucher_address.svg',
        'url': ''
      },
      {
        'position': 1,
        'name': 'document',
        'description': 'CNH',
        'selected': false,
        'src': 'assets/imgs/documents/document.svg',
        'url': ''
      },
      {
        'position': 2,
        'name': 'single_transfer_document',
        'description': 'DUT',
        'selected': false,
        'src': 'assets/imgs/documents/single_transfer_document.svg',
        'url': ''
      }];

    this.carFrontPhotos = [
      {
        'position': 3,
        'name': 'front',
        'description': 'Frente',
        'selected': false,
        'src': 'assets/imgs/car/front.svg',
        'url': ''
      },
      {
        'position': 4,
        'name': 'left_diagonal_front',
        'description': 'Diagonal esquerda',
        'selected': false,
        'src': 'assets/imgs/car/left_diagonal_front.svg',
        'url': ''
      },
      {
        'position': 5,
        'name': 'right_diagonal_front',
        'description': 'Diagonal direita',
        'selected': false,
        'src': 'assets/imgs/car/right_diagonal_front.svg',
        'url': ''
      },
      {
        'position': 6,
        'name': 'plate_engine_front',
        'description': 'Motor com placa',
        'selected': false,
        'src': 'assets/imgs/car/plate_engine_front.svg',
        'url': ''
      },
      {
        'position': 7,
        'name': 'plate_key_front',
        'description': 'Chave com placa',
        'selected': false,
        'src': 'assets/imgs/car/plate_key_front.svg',
        'url': ''
      },
      {
        'position': 8,
        'name': 'plate_left_headlight_front',
        'description': 'Farol esquerdo com placa',
        'selected': false,
        'src': 'assets/imgs/car/plate_left_headlight_front.svg',
        'url': ''
      },
      {
        'position': 9,
        'name': 'plate_right_headlight_front',
        'description': 'Farol direito com placa',
        'selected': false,
        'src': 'assets/imgs/car/plate_right_headlight_front.svg',
        'url': ''
      }
    ];

    this.carSidePhotos = [
      {
        'position': 10,
        'name': 'left_side',
        'description': 'Lateral esquerda',
        'selected': false,
        'src': 'assets/imgs/car/left_side.svg',
        'url': ''
      },
      {
        'position': 11,
        'name': 'right_side',
        'description': 'Lateral direita',
        'selected': false,
        'src': 'assets/imgs/car/right_side.svg',
        'url': ''
      }
    ];

    this.carRearPhotos = [
      {
        'position': 12,
        'name': 'rear',
        'description': 'Traseira',
        'selected': false,
        'src': 'assets/imgs/car/rear.svg',
        'url': ''
      },
      {
        'position': 13,
        'name': 'left_diagonal_rear',
        'description': 'Diagonal esquerda',
        'selected': false,
        'src': 'assets/imgs/car/left_diagonal_rear.svg',
        'url': ''
      },
      {
        'position': 14,
        'name': 'right_diagonal_rear',
        'description': 'Diagonal direita',
        'selected': false,
        'src': 'assets/imgs/car/right_diagonal_rear.svg',
        'url': ''
      },
      {
        'position': 15,
        'name': 'open_rear_door_rear',
        'description': 'Porta-malas aberto',
        'selected': false,
        'src': 'assets/imgs/car/open_rear_door_rear.svg',
        'url': ''
      },
      {
        'position': 16,
        'name': 'plate_left_flashlight_rear',
        'description': 'Lanterna esquerda com placa',
        'selected': false,
        'src': 'assets/imgs/car/plate_left_flashlight_rear.svg',
        'url': ''
      },
      {
        'position': 17,
        'name': 'plate_right_flashlight_rear',
        'description': 'Lanterna direita com placa',
        'selected': false,
        'src': 'assets/imgs/car/plate_right_flashlight_rear.svg',
        'url': ''
      }
    ];

    this.carTirePhotos = [
      {
        'position': 18,
        'name': 'left_front_tire',
        'description': 'Dianteiro esquerdo',
        'selected': false,
        'src': 'assets/imgs/car/left_front_tire.svg',
        'url': ''
      },
      {
        'position': 19,
        'name': 'right_front_tire',
        'description': 'Dianteiro direito',
        'selected': false,
        'src': 'assets/imgs/car/right_front_tire.svg',
        'url': ''
      },
      {
        'position': 20,
        'name': 'left_rear_tire',
        'description': 'Traseiro esquerdo',
        'selected': false,
        'src': 'assets/imgs/car/left_rear_tire.svg',
        'url': ''
      },
      {
        'position': 21,
        'name': 'right_rear_tire',
        'description': 'Traseiro direito',
        'selected': false,
        'src': 'assets/imgs/car/right_rear_tire.svg',
        'url': ''
      },
      {
        'position': 22,
        'name': 'spare_tire',
        'description': 'Estepe',
        'selected': false,
        'src': 'assets/imgs/car/spare_tire.svg',
        'url': ''
      }
    ];

    this.carInternalPhotos = [
      {
        'position': 23,
        'name': 'complete_panel_internal',
        'description': 'Painel completo',
        'selected': false,
        'src': 'assets/imgs/car/complete_panel_internal.svg',
        'url': ''
      },
      {
        'position': 24,
        'name': 'mileage_panel_internal',
        'description': 'Painel com KM',
        'selected': false,
        'src': 'assets/imgs/car/mileage_panel_internal.svg',
        'url': ''
      },
      {
        'position': 25,
        'name': 'identification_number_internal',
        'description': 'Chassis',
        'selected': false,
        'src': 'assets/imgs/car/identification_number_internal.svg',
        'url': ''
      }
    ];

    this.motorcycleFrontPhotos = [
      {
        'position': 26,
        'name': 'front',
        'description': 'Frente',
        'selected': false,
        'src': 'assets/imgs/motorcycle/front.svg',
        'url': ''
      }
    ];

    this.motorcycleSidePhotos = [
      {
        'position': 27,
        'name': 'left_side',
        'description': 'Lateral esquerda',
        'selected': false,
        'src': 'assets/imgs/motorcycle/left_side.svg',
        'url': ''
      },
      {
        'position': 28,
        'name': 'right_side',
        'description': 'Lateral direita',
        'selected': false,
        'src': 'assets/imgs/motorcycle/right_side.svg',
        'url': ''
      }
    ];

    this.motorcycleRearPhotos = [
      {
        'position': 29,
        'name': 'rear',
        'description': 'Traseira',
        'selected': false,
        'src': 'assets/imgs/motorcycle/rear.svg',
        'url': ''
      },
      {
        'position': 30,
        'name': 'plate',
        'description': 'Placa',
        'selected': false,
        'src': 'assets/imgs/motorcycle/plate.svg',
        'url': ''
      }
    ];

    this.motorcycleTirePhotos = [
      {
        'position': 31,
        'name': 'side_front_tire',
        'description': 'Dianteiro lateral',
        'selected': false,
        'src': 'assets/imgs/motorcycle/side_front_tire.svg',
        'url': ''
      }
    ];

    this.motorcycleInternalPhotos = [
      {
        'position': 32,
        'name': 'mileage_panel',
        'description': 'Painel com KM',
        'selected': false,
        'src': 'assets/imgs/motorcycle/mileage_panel.svg',
        'url': ''
      },
      {
        'position': 33,
        'name': 'identification_number',
        'description': 'Chassis',
        'selected': false,
        'src': 'assets/imgs/motorcycle/identification_number.svg',
        'url': ''
      }
    ];

    this.pickupFrontPhotos = [
      {
        'position': 34,
        'name': 'front',
        'description': 'Frente',
        'selected': false,
        'src': 'assets/imgs/pickup/front.svg',
        'url': ''
      },
      {
        'position': 35,
        'name': 'left_diagonal_front',
        'description': 'Diagonal esquerda',
        'selected': false,
        'src': 'assets/imgs/pickup/left_diagonal_front.svg',
        'url': ''
      },
      {
        'position': 36,
        'name': 'right_diagonal_front',
        'description': 'Diagonal direita',
        'selected': false,
        'src': 'assets/imgs/pickup/right_diagonal_front.svg',
        'url': ''
      },
      {
        'position': 37,
        'name': 'plate_engine_front',
        'description': 'Motor com placa',
        'selected': false,
        'src': 'assets/imgs/pickup/plate_engine_front.svg',
        'url': ''
      },
      {
        'position': 38,
        'name': 'plate_key_front',
        'description': 'Chave com placa',
        'selected': false,
        'src': 'assets/imgs/pickup/plate_key_front.svg',
        'url': ''
      },
      {
        'position': 39,
        'name': 'plate_left_headlight_front',
        'description': 'Farol esquerdo com placa',
        'selected': false,
        'src': 'assets/imgs/pickup/plate_left_headlight_front.svg',
        'url': ''
      },
      {
        'position': 40,
        'name': 'plate_right_headlight_front',
        'description': 'Farol direito com placa',
        'selected': false,
        'src': 'assets/imgs/pickup/plate_right_headlight_front.svg',
        'url': ''
      }
    ];

    this.pickupSidePhotos = [
      {
        'position': 41,
        'name': 'left_side',
        'description': 'Lateral esquerda',
        'selected': false,
        'src': 'assets/imgs/pickup/left_side.svg',
        'url': ''
      },
      {
        'position': 42,
        'name': 'right_side',
        'description': 'Lateral direita',
        'selected': false,
        'src': 'assets/imgs/pickup/right_side.svg',
        'url': ''
      }
    ];

    this.pickupRearPhotos = [
      {
        'position': 43,
        'name': 'rear',
        'description': 'Traseira',
        'selected': false,
        'src': 'assets/imgs/pickup/rear.svg',
        'url': ''
      },
      {
        'position': 44,
        'name': 'left_diagonal_rear',
        'description': 'Diagonal esquerda',
        'selected': false,
        'src': 'assets/imgs/pickup/left_diagonal_rear.svg',
        'url': ''
      },
      {
        'position': 45,
        'name': 'right_diagonal_rear',
        'description': 'Diagonal direita',
        'selected': false,
        'src': 'assets/imgs/pickup/right_diagonal_rear.svg',
        'url': ''
      },
      {
        'position': 46,
        'name': 'open_rear_door_rear',
        'description': 'Porta-malas aberto',
        'selected': false,
        'src': 'assets/imgs/pickup/open_rear_door_rear.svg',
        'url': ''
      },
      {
        'position': 47,
        'name': 'plate_left_flashlight_rear',
        'description': 'Lanterna esquerda com placa',
        'selected': false,
        'src': 'assets/imgs/pickup/plate_left_flashlight_rear.svg',
        'url': ''
      },
      {
        'position': 48,
        'name': 'plate_right_flashlight_rear',
        'description': 'Lanterna direita com placa',
        'selected': false,
        'src': 'assets/imgs/pickup/plate_right_flashlight_rear.svg',
        'url': ''
      }
    ];

    this.pickupTirePhotos = [
      {
        'position': 49,
        'name': 'left_front_tire',
        'description': 'Dianteiro esquerdo',
        'selected': false,
        'src': 'assets/imgs/pickup/left_front_tire.svg',
        'url': ''
      },
      {
        'position': 50,
        'name': 'right_front_tire',
        'description': 'Dianteiro direito',
        'selected': false,
        'src': 'assets/imgs/pickup/right_front_tire.svg',
        'url': ''
      },
      {
        'position': 51,
        'name': 'left_rear_tire',
        'description': 'Traseiro esquerdo',
        'selected': false,
        'src': 'assets/imgs/pickup/left_rear_tire.svg',
        'url': ''
      },
      {
        'position': 52,
        'name': 'right_rear_tire',
        'description': 'Traseiro direito',
        'selected': false,
        'src': 'assets/imgs/pickup/right_rear_tire.svg',
        'url': ''
      },
      {
        'position': 53,
        'name': 'spare_tire',
        'description': 'Estepe',
        'selected': false,
        'src': 'assets/imgs/pickup/spare_tire.svg',
        'url': ''
      }
    ];

    this.pickupInternalPhotos = [
      {
        'position': 54,
        'name': 'complete_panel_internal',
        'description': 'Painel completo',
        'selected': false,
        'src': 'assets/imgs/pickup/complete_panel_internal.svg',
        'url': ''
      },
      {
        'position': 55,
        'name': 'mileage_panel_internal',
        'description': 'Painel com KM',
        'selected': false,
        'src': 'assets/imgs/pickup/mileage_panel_internal.svg',
        'url': ''
      },
      {
        'position': 56,
        'name': 'identification_number_internal',
        'description': 'Chassis',
        'selected': false,
        'src': 'assets/imgs/pickup/identification_number_internal.svg',
        'url': ''
      }
    ];

    this.signaturePhoto = [
      {
        'position': 200,
        'name': 'signature',
        'description': 'Assinaturas',
        'selected': false,
        'src': 'assets/imgs/autograph_filled.svg',
        'url': ''
      }
    ];
  }

  async confirmCreateAccount(cpfCnpj: string) {
    let confirmation = await this.alertCtrl.presentConfirm('Ops!', `\nAtenção!`, 'CPF/CNPJ não cadastrado.', 'Vistoriar meu veículo', 'Vistoria de veículo de cliente');
    //  let confirmation = await this.alertCtrl.presentConfirmUnique('Ops!', '', `Seu CPF/CNPJ não se encontra na nossa base de dados. \nÉ necessário efetuar o seu cadastro.`, 'Clique aqui para cadastrar');

    if (confirmation) {
      this.form.patchValue({
        myAccount: false
      });
      this.navCtrl.push(CreateAccountPage, { cpfCnpj: cpfCnpj });
    } else {
      this.form.patchValue({
        myAccount: true
      });
    }
  }

  setAccount(account: Account) {
    this.form.get('associated').patchValue({
      name: account.name,
      email: account.email,
      cpfCnpj: account.cpf_cnpj
    });
  }

  verifyData() {
    if (!this.form.valid) {
      this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, `Dados incompletos ou preenchidos incorretamente.`);
      return;
    }

    if (!this.form.get('readAndAgree').value) {
      this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, `Para enviar a vistoria você deve ler e concordar com os termos do contrato.`);
      return;
    }

    if (!this.validMedia()) {
      this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, `Para enviar a vistoria você deve fazer todas as fotos.`);
      return;
    }

    /*
        if (this.mediaFiles.length == 0) {
          this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, `Para enviar a vistoria você deve fazer o vídeo do veículo.`);
          return;
        }
    */

    this.formToInspection();
    this.navCtrl.push(InspectionConfirmPage, { inspection: this.inspection, photos: this.photos, mediaFiles: this.mediaFiles });
  }

  formToInspection() {
    this.inspection.status = this.form.get('status').value;
    this.inspection.myAccount = this.form.get('myAccount').value;
    this.inspection.utilization = this.form.get('utilization').value;
    this.inspection.typeVehicle = this.form.get('typeVehicle').value;

    let brandVehicle: BrandVehicle = JSON.parse(JSON.stringify(this.form.get('brand').value));
    this.inspection.brand = this.getBrandById(brandVehicle.id);

    let modelVehicle: ModelVehicle = JSON.parse(JSON.stringify(this.form.get('model').value));
    this.inspection.model = this.getModelByModelCode(modelVehicle.model_code);

    let yearFuelVehicle: YearFuelVehicle = JSON.parse(JSON.stringify(this.form.get('yearFuel').value));
    this.inspection.yearFuel = this.getYearFuelById(yearFuelVehicle.id);

    this.inspection.plate = this.form.get('plate').value;
    this.inspection.chassis = this.form.get('chassis').value;
    this.inspection.renavam = this.form.get('renavam').value;
    this.inspection.color = this.form.get('color').value;
    this.inspection.plan = this.form.get('plan').value;
    this.inspection.inputValue = this.form.get('inputValue').value;
    this.inspection.monthlyValue = this.form.get('monthlyValue').value;
    this.inspection.feeValue = this.form.get('feeValue').value;
    this.inspection.readAndAgree = this.form.get('readAndAgree').value;

    this.inspection.associated = this.form.get('associated').value;
    this.inspection.inspector = this.form.get('inspector').value;
    this.inspection.contract = this.form.get('contract').value;
    this.inspection.media = [];
  }

  validMedia() {
    this.photos = [];
    let typeVehicle = this.form.get('typeVehicle').value;
    let photosOK = true;

    this.documentsPhotos.forEach(photo => {
      this.photos.push(photo);
    });

    if (typeVehicle == 'Carro e Pickups') {
      this.carFrontPhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.carSidePhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.carRearPhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.carTirePhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.carInternalPhotos.forEach(photo => {
        this.photos.push(photo);
      });
    } else if (typeVehicle == 'Moto') {
      this.motorcycleFrontPhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.motorcycleSidePhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.motorcycleRearPhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.motorcycleTirePhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.motorcycleInternalPhotos.forEach(photo => {
        this.photos.push(photo);
      });
    } else if (typeVehicle == 'Pickups') {
      this.pickupFrontPhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.pickupSidePhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.pickupRearPhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.pickupTirePhotos.forEach(photo => {
        this.photos.push(photo);
      });

      this.pickupInternalPhotos.forEach(photo => {
        this.photos.push(photo);
      });
    }

    this.signaturePhoto.forEach(photo => {
      this.photos.push(photo);
    });

    this.photos.forEach(photo => {
      if (!photo.selected) {
        photosOK = false;
      }
    });
    return photosOK;
  }

  setValuePlan(inputValue: any, monthlyValue: any) {
    this.inputValue = inputValue == null ? null : parseFloat(inputValue).toFixed(2);
    this.monthlyValue = inputValue == null ? null : parseFloat(inputValue).toFixed(2);

    this.form.patchValue({
      inputValue: inputValue,
      monthlyValue: monthlyValue
    });
  }

  getPicture(photo: any) {
    this.camera.getPicture(this.photoOptions).then((fileUriImage) => {
      let srcImage = 'data:image/jpeg;base64,' + fileUriImage;
      this.setPicture(photo, srcImage);
    }, (error) => {
      console.log(error);
    });
  }

  setPicture(photo: any, base64File: any) {
    if (photo.position >= 0 && photo.position <= 2) {
      for (let p of this.documentsPhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 3 && photo.position <= 9) {
      for (let p of this.carFrontPhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 10 && photo.position <= 11) {
      for (let p of this.carSidePhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 12 && photo.position <= 17) {
      for (let p of this.carRearPhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 18 && photo.position <= 22) {
      for (let p of this.carTirePhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 23 && photo.position <= 25) {
      for (let p of this.carInternalPhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position == 26) {
      this.motorcycleFrontPhotos[0].src = base64File;
      this.motorcycleFrontPhotos[0].selected = true;
    }

    if (photo.position >= 27 && photo.position <= 28) {
      for (let p of this.motorcycleSidePhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 29 && photo.position <= 30) {
      for (let p of this.motorcycleRearPhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position == 31) {
      this.motorcycleTirePhotos[0].src = base64File;
      this.motorcycleTirePhotos[0].selected = true;
      return;
    }

    if (photo.position >= 32 && photo.position <= 33) {
      for (let p of this.motorcycleInternalPhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 34 && photo.position <= 40) {
      for (let p of this.pickupFrontPhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 41 && photo.position <= 42) {
      for (let p of this.pickupSidePhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 43 && photo.position <= 48) {
      for (let p of this.pickupRearPhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 49 && photo.position <= 53) {
      for (let p of this.pickupTirePhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position >= 54 && photo.position <= 56) {
      for (let p of this.pickupInternalPhotos) {
        if (p.position == photo.position) {
          p.src = base64File;
          p.selected = true;
          return;
        }
      }
    }

    if (photo.position == 200) {
      this.signaturePhoto[0].src = base64File;
      this.signaturePhoto[0].selected = true;
    }
  }

  setPictureAll(photos: Photo[]) {
    photos.forEach(photo => {
      this.setPicture(photo, photo.src);
    });
  }

  getVideoVehicle() {
    let options: CaptureVideoOptions = { limit: 1, quality: 80 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => {
          this.mediaFiles = data;
        },
        (error: CaptureError) => this.presentToast('Falha ao tentar capturar vídeo.')
      );
  }

  playVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (error) => {
        this.presentToast('Erro ao tentar reproduzir o vídeo.');
      },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
    let videoUrl = this.mediaFiles[0].fullPath;
    this.streamingMedia.playVideo(videoUrl, options);
  }

  presentToast(message: string) {
    this.toastCtrl.presentToast(message, 2000, 'bottom');
  }

  slideNext(slide: string) {
    let slides: Slides = slide == 'typeVehicleSlides' ? this.typeVehicleSlides : this.planSlides;
    if (slides.isEnd()) {
      slides.slideTo(0);
    } else {
      slides.slideNext();
    }
  }

  slidePrev(slide: string) {
    let slides: Slides = slide == 'typeVehicleSlides' ? this.typeVehicleSlides : this.planSlides;
    if (slides.isBeginning()) {
      slides.slideTo(slides.length() - 1);
    } else {
      slides.slidePrev();
    }
  }

  utilizationChanged(utilization: Utilization) {
    this.utilizations.forEach(u => {
      if (u.id != utilization.id) {
        u.selected = false;
      }
    });
  }

  downloadContract() {
    let url = this.fileProvider.file.applicationDirectory + 'www/assets/pdf/ancore_contract.pdf';
    let newUrl = this.fileProvider.path + 'download/' + 'ancore_contract.pdf';
    let fileTransfer: FileTransferObject = this.transfer.create();

    this.loadingCtrl.presentMessage('Baixando arquivo...');
    fileTransfer.download(url, newUrl).then((entry) => {
      let url = entry.toURL();
      this.fileOpener.open(url, 'application/pdf')
        .then(() => console.log('download contract...'))
        .catch(e => console.log(e));
    });
    this.loadingCtrl.dismiss();
  }

  getAddress() {
    let zipcode: string = this.form.get('associated.address.zipcode').value;
    if (zipcode.length == 9) {
      this.loadingCtrl.present();
      this.zipCodeProvider.getAddress(zipcode).pipe(take(1)).subscribe(
        result => {
          if (!result['erro']) {
            this.form.get('associated.address').patchValue({
              address: result['logradouro'],
              district: result['bairro'],
              city: result['localidade'],
              state: result['uf']
            });
          } else {
            this.presentToast('Cep não encontrado.')
            this.form.get('associated.address').patchValue({
              address: null,
              district: null,
              city: null,
              state: null
            });
          }
        }
      );
      this.loadingCtrl.dismiss();
    }
  }

  getModelByModelCode(model_code: string): Model {
    let model: Model = this.models.filter(m => m.attributes.model_code === model_code)[0];
    return model;
  }

  getBrandById(id: string): Brand {
    let brand: Brand = this.brands.filter(b => b.id === id)[0];
    return brand;
  }

  getYearFuelById(id: string): YearFuel {
    let yearFuel: YearFuel = this.yearsFuels.filter(i => i.id === id)[0];
    return yearFuel;
  }

  setBrandsVehicle() {
    this.brands.forEach(brand => {
      let brandVehicle: BrandVehicle = new BrandVehicle();
      brandVehicle.id = brand.id;
      brandVehicle.brand_code = brand.attributes.brand_code;
      brandVehicle.name = brand.attributes.name;
      this.brandsVehicle.push(brandVehicle);
    });
  }

  setModelsVehicle() {
    this.models.forEach(model => {
      let modelVehicle = new ModelVehicle();
      modelVehicle.id = model.id;
      modelVehicle.model = model.attributes.model;
      modelVehicle.model_code = model.attributes.model_code;
      this.modelsVehicle.push(modelVehicle);
    });
  }

  setYearsFuelsVehicle() {
    this.yearsFuels.forEach(yf => {
      let yearFuelVehicle = new YearFuelVehicle;
      yearFuelVehicle.id = yf.id;
      yearFuelVehicle.model_code = yf.attributes.model_code;
      yearFuelVehicle.model_year = yf.attributes.model_year;
      yearFuelVehicle.fuel_type = yf.attributes.fuel_type;
      yearFuelVehicle.year_fuel = yearFuelVehicle.model_year + ' / ' + yearFuelVehicle.fuel_type;
      this.yearsFuelsVehicle.push(yearFuelVehicle);
    });
  }

  formatPlate(param: string) {
    let value = param;
    if (value != null) {
      this.form.patchValue({
        plate: value.toLocaleUpperCase()
      });
    }
  }

  setMaskCpfCnpj(param: string) {
    console.log(param.length);
    if (param.length < 14) {
      this.maskCpfCnpj = '000.000.000-00';
    } else {
      this.maskCpfCnpj = '00.000.000/0000-00';
    }
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

  ngOnDestroy() {
  }
}
