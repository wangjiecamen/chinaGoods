<template>
  <div class="application">
    <navbar :hideTop="false" :show="'home'"/>
    <p class="sendEmail">{{$t('application.sendEmailCue')}}<a href="mailto:freetoyiwu@chinagoods.com">freetoyiwu@chinagoods.com</a></p>
    <div class="ct">
      <!-- 1.采购商类型 -->
      <p class="slgon">{{$t('application.slgon')}}</p>
      <el-form ref="form" :model="model" :rules="rules">
        <p class="title">{{$t('application.purchaserType')}}</p>
        <el-form-item>
          <el-radio-group v-model="model.type" text-color="#189D50" fill="#189D50" @change="typeChange">
            <el-radio :label="1">{{$t('application.purchaserType1')}}</el-radio>
            <el-radio :label="2">{{$t('application.purchaserType2')}}</el-radio>
            <el-radio :label="3">{{$t('application.purchaserType3')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="file-wp" v-if="model.type===1">
          <div class="file-list">
            <div class="left">{{$t('application.enclosure')}}</div>
            <div class="right">
                <!-- :accept='fileType' -->
              <el-upload
                :action="uploadfile"
                list-type="picture-card"
                :file-list="model.enclosure"
                :limit="limit"
                :beforeUpload="beforeUpload"
                :on-success="uploadsucess"
                :on-remove="handleRemove"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <div class="cue">
            <p>{{$t('application.cue4')}}</p>
          </div>
        </div>
        <div class="file-wp" v-if="model.type===2">
          <div class="file-list">
            <div class="left">{{$t('application.accessRecords')}}</div>
            <div class="right">
                <!-- :accept='fileType' -->
              <el-upload
                :action="uploadfile"
                list-type="picture-card"
                :file-list="model.accessRecordsFile"
                :limit="limit"
                :beforeUpload="beforeUpload"
                :on-success="uploadsucess2"
                :on-remove="handleRemove2"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <div class="file-list">
            <div class="left">{{$t('application.purchaseRecord')}}</div>
            <div class="right">
                <!-- :accept='fileType' -->
              <el-upload
                :action="uploadfile"
                list-type="picture-card"
                :file-list="model.purchaseRecordFile"
                :limit="limit"
                :beforeUpload="beforeUpload"
                :on-success="uploadsucess3"
                :on-remove="handleRemove3"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <div class="cue">
            <p>{{$t('application.cue1')}}</p>
            <p>{{$t('application.cue2')}}</p>
            <p>{{$t('application.cue3')}}</p>
          </div>
        </div>
        <div class="file-wp" v-if="model.type===3">
          <div class="file-list">
            <div class="left">{{$t('application.enclosure')}}</div>
            <div class="right">
                <!-- :accept='fileType' -->
              <el-upload
                :action="uploadfile"
                list-type="picture-card"
                :file-list="model.enclosure"
                :limit="limit"
                :beforeUpload="beforeUpload"
                :on-success="uploadsucess"
                :on-remove="handleRemove"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <div class="cue">
            <p>{{$t('application.cue5')}}</p>
          </div>
        </div>
        <!-- 2.您的姓名 -->
        <p class="title">{{$t('application.yourName')}}</p>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="surname">
              <el-input v-model="model.surname" :placeholder="$t('application.placeholderSurname')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name">
              <el-input v-model="model.name" :placeholder="$t('application.placeholderName')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 3.您的性别 -->
        <p class="title">{{$t('application.yourSex')}}</p>
        <el-form-item prop="sex">
          <el-radio-group v-model="model.sex" text-color="#189D50" fill="#189D50">
            <el-radio :label="1">{{$t('application.male')}}</el-radio>
            <el-radio :label="2">{{$t('application.female')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 4.您的出生日期 -->
        <p class="title">{{$t('application.yourBirthday')}}</p>
        <el-form-item prop="birthday">
          <el-date-picker
            v-model="model.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            :placeholder="$t('application.time')">
          </el-date-picker>
        </el-form-item>
        <!-- 5.发护照国家 -->
        <p class="title">{{$t('application.passportCountry')}}</p>
        <el-form-item prop="passportCountry">
          <el-select class="block" filterable  v-model="model.passportCountry" :placeholder="$t('application.pleaseChoose')">
            <el-option
              v-for="item in passportCountryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 6.护照号码 -->
        <p class="title">{{$t('application.passportNumber')}}</p>
        <el-form-item prop="passportId">
          <el-input v-model="model.passportId" :placeholder="$t('application.pleaseInput')"></el-input>
        </el-form-item>
        <!-- 7.联系方式 -->
        <p class="title">{{$t('application.contactWays')}}</p>
        <el-form-item prop="domesticTel">
          <el-input :placeholder="$t('application.domesticTelInput')" v-model="model.domesticTel">
            <template slot="prepend">{{$t('application.domesticTel')}}</template>
          </el-input>
        </el-form-item>
        <el-form-item prop='overseasTel'>
          <el-input :placeholder="$t('application.overseasTelInput')" v-model="model.overseasTel">
            <template slot="prepend">{{$t('application.overseasTel')}}</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input :placeholder="$t('application.pleaseInput')" v-model="model.email">
            <template slot="prepend">{{$t('application.email')}}</template>
          </el-input>
        </el-form-item>
        <!-- 8.拟定航班信息 -->
        <p class="title">{{$t('application.flightInfo')}}</p>
        <el-form-item>
          <el-radio-group v-model="model.flightRadio" text-color="#189D50" fill="#189D50">
            <el-radio :label="1">{{$t('application.Directflight')}}</el-radio>
            <el-radio :label="2">{{$t('application.oneTransit')}}</el-radio>
          </el-radio-group>
          <img @click="comment = true" class="question-icon" src="@/assets/question.png" alt="">
        </el-form-item>
        <el-form-item prop="airlineCompany">
          <el-input :placeholder="$t('application.pleaseInput')" v-model="model.airlineCompany">
            <template slot="prepend">{{$t('application.airlineCompany')}}</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="flightNumber">
          <el-input :placeholder="$t('application.pleaseInput')" v-model="model.flightNumber">
            <template slot="prepend">{{$t('application.flightNumber')}}</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="departureDate">
          <el-date-picker
            v-model="model.departureDate"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="explainPickerOptions"
            :placeholder="$t('application.departureDate')">
          </el-date-picker>
        </el-form-item>
        <div class="zhuanji" v-if="model.flightRadio===2">
          <p class="title-zhuan">{{$t('application.Transit')}}</p>
          <el-form-item prop="zhuanairlineCompany">
            <el-input :placeholder="$t('application.pleaseInput')" v-model="model.zhuanairlineCompany">
              <template slot="prepend">{{$t('application.airlineCompany')}}</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="zhuanflightNumber">
            <el-input :placeholder="$t('application.pleaseInput')" v-model="model.zhuanflightNumber">
              <template slot="prepend">{{$t('application.flightNumber')}}</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="zhuandepartureDate">
            <el-date-picker
              v-model="model.zhuandepartureDate"
              type="date"
              value-format="yyyy-MM-dd"
              :picker-options="explainPickerOptions"
              :placeholder="$t('application.departureDate')">
            </el-date-picker>
          </el-form-item>
        </div>
        <!-- 9.预计抵达义乌日期 -->
        <p class="title">{{$t('application.arrivalDate')}}</p>
        <el-form-item prop="arrivalDate">
          <el-date-picker
            v-model="model.arrivalDate"
            type="date"
            @change="startTimeChange"
            :picker-options="explainPickerOptions"
            value-format="yyyy-MM-dd"
            :placeholder="$t('application.time')">
          </el-date-picker>
        </el-form-item>
            <!-- 预计来义乌日期 --- 类型1,类型2 -->
        <div class="explain clearfix" v-if="model.type!==3">
          <div class="left">{{$t('application.explain')}}</div>
          <div class="right">
            <p>{{$t('application.type2list1')}}</p>
            <p>{{$t('application.type2list2')}}</p>
            <p>{{$t('application.type2list3')}}</p>
          </div>
        </div>
            <!-- 预计来义乌日期 --- 类型3 -->
        <div class="explain clearfix" v-if="model.type===3">
          <div class="left">{{$t('application.explain')}}</div>
          <div class="right">
            <p>{{$t('application.type3')}}</p>
          </div>
        </div>
       <!-- 10.在义乌住址 -->
        <!-- 在义乌住址  类型1  -->
        <!-- <div class="address">
          <div class="select-wp">
            <el-row>
              <el-col class="label-name" :span="2">{{$t('application.city')}}</el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-select class="block" v-model="model.city" :placeholder="$t('application.pleaseChoose')">
                    <el-option
                      v-for="item in citys"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="label-name" :span="2">{{$t('application.street')}}</el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-select class="block" v-model="model.street" :placeholder="$t('application.pleaseChoose')">
                    <el-option
                      v-for="item in streets"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="label-name" :span="4">{{$t('application.detailAddress')}}</el-col>
              <el-col :span="12">
                <el-input v-model="model.detailAddress" :placeholder="$t('application.pleaseInput')"></el-input>
              </el-col>
            </el-row>
          </div>
        </div> -->
        <!-- 在义乌住址  类型2 -->
        <div v-if="model.type!==1">
          <p class="title">{{$t('application.address')}}</p>
          <el-form-item >
            <el-radio-group v-model="model.addressRadio" text-color="#189D50" fill="#189D50">
              <el-radio :disabled="timeDisadbed" :label="1">{{$t('application.freeAccommodation')}}</el-radio>
              <el-radio :label="2">{{$t('application.homeAddress')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="address" v-if="model.addressRadio===1">
            <el-row :gutter="20">
              <el-col class="label-name">{{$t('application.hotelTime')}}</el-col>
              <el-col :span="10" :style="{marginLeft: '18px'}">
                <el-date-picker
                  v-model="model.arrivalDate"
                  type="date"
                  :placeholder="$t('application.startTime')"
                  :disabled="true"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-col>
              <el-col :span="10">
                <el-form-item prop='endTime'>
                  <el-date-picker
                    v-model="model.endTime"
                    type="date"
                    :placeholder="$t('application.endTime')"
                    value-format="yyyy-MM-dd"
                    :picker-options="endTimeOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="explain clearfix" v-if="model.type==2">
              <div class="left">{{$t('application.explain')}}</div>
              <div class="right">
                <p>{{$t('application.adslist1')}}</p>
                <p>{{$t('application.adslist2')}}</p>
                <p>{{$t('application.adslist3')}}</p>
              </div>
            </div>
             <div class="explain clearfix" v-if="model.type==3">
              <div>{{$t('application.adslist4')}}</div>
            </div>
          </div>
          <div class="address" v-if="model.addressRadio===2">
            <div class="explain clearfix">
              <div>{{$t('application.adslist4')}}</div>
            </div>
          </div>
        </div>
        <!-- 11.义乌境内发起邀请单位联系方式 -->
        <div v-if="model.type===3">
          <p class="title">{{$t('application.companyContant')}}</p>
          <el-form-item prop="companyName">
            <el-input :placeholder="$t('application.pleaseInput')" v-model="model.companyName">
              <template slot="prepend">{{$t('application.companyName')}}</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="companyPerson">
            <el-input :placeholder="$t('application.pleaseInput')" v-model="model.companyPerson">
              <template slot="prepend">{{$t('application.companyPerson')}}</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="companyTel">
            <el-input :placeholder="$t('application.pleaseInput')" v-model="model.companyTel">
              <template slot="prepend">{{$t('application.companyTel')}}</template>
            </el-input>
          </el-form-item>
        </div>
        <!-- 补贴说明 -->
        <div class="bottom">
          <p class="title">{{$t('application.cashExplain')}}</p>
          <p class="explain-txt">{{$t('application.explainTxt')}}</p>
          <p v-if="model.type === 3" class="explain-txt bold-txt">2. {{$t('application.explains')}}</p>
        </div>
        <el-form-item>
          <el-checkbox v-model="model.checked">

          </el-checkbox>
          <span :style="{marginLeft: '10px'}">{{$t('application.agree')}}</span>
          <span class="link" @click="dialogVisible=true">{{$t('application.agreement')}}</span>
        </el-form-item>
        <el-form-item>
          <el-button class="submiy-btn" type="primary" @click="submitForm('form')">{{$t('application.submit')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      :title="$t('application.title')"
      class=""
      :width="width"
      :visible.sync="dialogVisible">
      <ul>
        <li v-for="li in policy" :key="li.id">{{li}}</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <p>{{$t('application.company')}}</p>
        <p>{{$t('application.month')}}</p>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('application.illustration')"
      class="illustration"
      :width="width2"
      :visible.sync="comment">
      <ul>
        <li>{{$t('application.tips')}}</li>
      </ul>
    </el-dialog>
    <Footer style="position:static"></Footer>
  </div>
</template>
<script>
import navbar from "@/layout/components/navbar"
import Footer from '@/layout/components/footer'
import apiApplication from "@/model/application"
export default {
  name: 'application',
  data() {
    return {
      timeDisadbed: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      explainPickerOptions: {
        disabledDate(time) {
          const one = 30 * 24 * 3600 * 1000;
          const minTime = Date.now() - one;
          return time.getTime() < minTime;
        }
      },
      comment: false,
      passportCountryOptions: [],
      fileType: '.jpg,.jpeg,.png,.pdf',
      limit: 5, // 图片上传数量限制
      width: '50%',
      width2: '400px',
      uploadfile: `${process.env.VUE_APP_API}/v1/foreign/upload`,
      citys: [{
        label: '义务市',
        value: 1
      }],
      streets: [],
      dialogVisible: false,
      content: '',
      keys: {
        'zh': 'zh_CN',
        'en': 'en'
      },
      typekeys: {
        1: 'resident',
        2: 'records',
        3: 'first'
      },
      accommodationType: {
        1: 'free',
        2: 'own'
      },
      model: {
        type: 1, // 采购商类型
        accessRecordsFile: [], //出入记录文件
        purchaseRecordFile: [], // 采购记录文件
        enclosure: [], // 附件
        surname: '',
        name: '',
        sex: 1,
        birthday: '',
        passportCountry: '',
        passportId: '',
        domesticTel: '',
        overseasTel: '',
        email: '',
        airlineCompany: '',
        flightNumber: '',
        departureDate: '',
        zhuanairlineCompany: '',
        zhuanflightNumber: '',
        zhuandepartureDate: '',
        arrivalDate: '',
        city: '义务市',
        street: '',
        detailAddress: '',
        addressRadio: 1,
        // startTime: null,
        endTime: '',
        companyName: '',
        companyPerson: '',
        companyTel: '',
        checked: true,
        flightRadio: 1
      },

      policyZh: [
        '尊敬的外国采购商：',
        '如果您符合如下条件的，可以享受CCC group提供的奖励',
        '一、在义乌注册的商贸型企业外籍股东或外籍法定代表人（第①类）',
        '适用范围：自本办法公布之日至2020年3月10日，自境外返回义乌。',
        '(一)给予境外自行来义航班补贴。自行由境外乘坐航班来义的外籍采购商，2月29日前抵义的，航班经济舱费用全额补贴；3月1日至3月10日抵义的，航班经济舱费用补贴50%。离义航班费用不纳入补贴范围，亲属费用自理',
        '(二)给予特定区域包机来义服务。对具备包机条件的国家/地区，视实际情况，为该区域来义外籍采购商提供包机来义免费搭乘服务',
        '二、在义乌有出入记录且有采购记录的外籍采购商（第②类）',
        '适用范围：自本办法公布之日至2020年3月10日，自境外返回义乌。',
        '(一)给予境外自行来义航班补贴。自行由境外乘坐航班来义的外籍采购商，2月29日前抵义的，航班经济舱费用全额补贴；3月1日至3月10日抵义的，航班经济舱费用补贴50%。离义航班费用不纳入补贴范围，亲属费用自理。',
        '(二)给予特定区域包机来义服务。对具备包机条件的国家/地区，视实际情况，为该区域来义外籍采购商提供包机来义免费搭乘服务。',
        '(三)给予来义采购免费食宿保障。外籍采购商2月29日之前抵义的，提供七日免费食宿；3月1日至3月10日抵义的，提供三日免费食宿。酒店由商城集团指定。',
        '(四)给予在义期间外贸服务保障。3月10日前抵义的外商如需翻译对接、货物物流等服务，商城集团将协助联络市相关主管部门提供专项保障。',
        '三、在义乌无出入记录或无采购记录的外籍采购商（第③类）',
        '适用范围：自本办法公布之日至2020年3月10日，自境外返回义乌',
        '(一)给予来义采购免费食宿保障。自本办法公布之日至3月10日抵义的，提供三日免费食宿，酒店由商城集团指定。',
        '(二)采购后给予首次来义航班补贴。需经义乌外贸企业或市场经营户事前备案的方能享受：抵义后十五日内在义采购金额达5万美元及以上的（需要从境外汇款到义乌企业的凭证），可享受非首次来义外商同等标准航班补贴。',
        '四、申请及受理流程',
        '（一）申请通道（开放时间：2月21日-3月9日）',
        '申请网页：http://freetoyiwu.chinagoods.com',
        '咨询邮件：freetoyiwu@chinagoods.com',
        '（二）申请录入信息',
        '1.符合条件的第①类外籍采购商：',
        '基础信息：国籍、姓名、护照ID等信息',
        '常驻信息：义乌商贸企业（申请人为股东或法定代表）营业执照照片或扫描件',
        '2.符合条件的第②类外籍采购商：',
        '基础信息：国籍、姓名、护照ID等信息',
        '出入记录：2020年1月1日之前的义乌出入境记录、商友卡、义乌酒店入住记录任一种。',
        '采购记录：2020年1月1日之前的同义乌外贸企业或市场经营户的资金往来凭证。',
        '3.符合条件的第③类外籍采购商（义乌外贸企业或市场经营户填写）：',
        '外贸企业或经营户基础信息：加盖公章的营业执照扫描件',
        '拟邀请的外商基础信息：国籍、姓名、护照ID、航班等信息。',
        '（四）审核',
        '1.由市有关部门及商城集团组成审核小组，收到网页或邮件的申请信息后24小时内审核完成并返回确认结果及入驻酒店等信息。',
        '2.商城集团根据外商申请信息，符合包机条件及人数要求的，确定第①②类外商包机航程并邮件告知包机信息。',
        '（五）兑现',
        '1.第①类外商需在抵义后，十五个工作日内，携带机票购买凭证及护照，前往义乌小商品城采购商服务中心（义乌市国际商贸城四区1楼南2号门）兑现补贴。',
        '2.第②类外商由入住酒店负责机票购买凭证收集工作，办理离店手续时一并兑现补贴。',
        '3.经义乌外贸企业或市场经营户事前备案的第③类外商，抵义十五日内向义乌商贸企业或市场经营户采购、金额达五万美元及以上的，凭采购合同及汇款凭证，向义乌小商品城采购商服务中心（义乌市国际商贸城四区1楼南2号门）提出申请，符合条件的，兑现补贴。',
        '四、附则',
        '本办法自公布之日起实施，如有变化另行通知。',
        '本办法由商城集团负责解释。'
      ],
      policyEn: [
        'Dear Foreign Buyers,',
        'Welcome to Yiwu. You can have access to certain subsidies provided by CCC Group if you meet the following conditions.',
        '1.Foreign buyers who are the shareholders or legal representatives of commercial and trade companies registered in Yiwu.(refer to as Type①)',
        'Application scope: From the initial effective date of the measures to March 10, 2020, exclusive for inbound foreign buyers to Yiwu',
        '(1) Flight subsidies will be given to foreign buyers who come to Yiwu  from abroad. For those arriving in Yiwu by air before February 29, their flights expenses (the economy class) will be fully subsidized. For those arriving from March 1st to March 10th,their flights expenses (the economy class) will be half subsidized. Departure flights from Yiwu and all flights expenses of family members are not included in the subsidy package.',
        '(2) Provide charter flight service to foreign buyers from specific area to Yiwu. For those foreign buyers from countries/regions that meet the conditions for charter flights, we will provide free charter flights to Yiwu depending upon actual situation.',
        '(3)Provide foreign trade service to foreign buyers during their stay in Yiwu. For the buyers who arrive in Yiwu before March 10, if they need services such as translation, logistics, etc., CCC Group will assist to contact relevant municipal departments to provide directed services.',
        '2.Foreign buyers who have previous Yiwu entry and exit and procurement records.(refer to as Type ②)',
        'Application scope: From the initial effective date of the measures to March 10, 2020, exclusive for inbound foreign buyers to Yiwu',
        '(1) Flight subsidies will be given to foreign buyers who come to Yiwu from abroad. For those arriving in Yiwu by air before February 29, their flights expenses (the economy class) will be fully subsidized. For those arriving from March 1st to March 10th,their flights expenses (the economy class) will be half subsidized. Departure flights from Yiwu and all flights expenses of family members are not included in the subsidy package.',
        '(2) Provide charter flight service to foreign buyers from specific area to Yiwu. For those foreign buyers from countries/regions that meet the conditions for charter flights, we will provide free charter flights to Yiwu depending upon actual situation.',
        '(3) Provide free accommodation for foreign buyers who purchase in Yiwu. Seven days of free accommodation will be provided if inbound foreign buyers arrive in Yiwu before February 29. Three days of free accommodation will be provided if the arrival date is from March 1st to March 10th. Hotels will be designated by CCC Group.',
        '(4)Provide foreign trade service to foreign buyers during their stay in Yiwu. For the buyers who arrive in Yiwu before March 10, if they need services such as translation, logistics, etc., CCC Group will assist to contact relevant municipal departments to provide directed services.',
        '3. Foreign buyers with no entry & exit or procurement records in Yiwu (Type③).',
        'Application scope: From the initial effective date of the measures to March 10, 2020, exclusive for inbound foreign buyers to Yiwu',
        '(1) Provide free accommodation to foreign buyers who purchase in Yiwu. Three days of free accommodation will be provided to those foreign buyers who arrive in Yiwu from the announcement date till March 10. Hotels will be designated by CCC Group.',
        '(2)The above mentioned flight subsidy will be made available if they make procurement. One of the condition is that their arrival having been registered by Yiwu foreign trade companies or market dealers in advance. Another is that they make valid procurement of USD 50,000 or above(remittance voucher from overseas account to Yiwu is needed) within 15 days after their arrival.',
        '4. Application & Processing Procedure',
        '(1)	Application Channels (Open time: Feb.21-Mar.9)',
        'Web Application: http://freetoyiwu.chinagoods.com',
        'Q&A E-mail: freetoyiwu@chinagoods.com',
        '(2) Application information input',
        '1) Qualified foreign buyers of Type ①:',
        'Basic information: Nationality, name, passport ID, etc.',
        'Resident information: Photo or scan copy of Business license of Yiwu business and trade companies (Applicant is  shareholder or legal representative)',
        '2) Qualified foreign buyers of Type ②:',
        'Basic information: Nationality, name, passport ID, etc.',
        'Entry& Exit records: Entry and Exit record to Yiwu before Jan.1 2020, Yiwu Foreign Citizen Card or Yiwu hotel check-in record, any kind of above records is OK.',
        'Procurement record: transaction record with business enterprises or market dealers in Yiwu before January 1, 2020.',
        '3) Qualified foreign buyers of Type ③ (Filled in by Yiwu trade companies or market dealers):',
        'Basic information of Yiwu foreign trade enterprise or market dealers: scanned copy of business license with official seal.',
        'The basic information of foreign buyers to be invited: Nationality, name, passport ID, flight, etc.',
        '4. Review:',
        '(1) Application will be reviewed by review team consisted of CCC Group and relevant Yiwu municipal departments. Applicant will get feedback within 24 hours since application submission, hotel information will be included in the feedback once approved.',
        '(2) The availability of the charter flight service and its flight routes will be determined by CCC Group, considering the number of qualified applicants and certain conditions. Foreign buyers of Type ① and ② who have applied for charter flight service will be informed by emails.',
        '5. Cash on subsidy',
        '(1)In order to get the subsidy, foreign buyers of Type ① should bring their flight ticket voucher or invoice and passport to CCC Buyers Service Center (South Gate 2, 1st Floor, District 4 of Yiwu International Trade Mart) within 15 working days after their arrival.',
        '(2) Foreign buyers of Type② shall give their flight ticket voucher or invoice to hotels where they live, subsidy will be given to them when they check out. ',
        '(3) Foreign business people of Type ③ , whose arrival registered and reported by trading companies in advance, can have the access to the subsidies provided by CCC Group, on the condition that their procurement amount reaching or exceeding 50,000 US dollars within 15 days after their arrival. They shall apply to Buyers Service Center (Address: South Gate 2, 1st Floor , District 4 of Yiwu International Trade Mart) with the purchase contract and remittance voucher, and if they meet the conditions, they will get the subsidies .',
        '5. Supplementary Articles',
        'This measure will take effect from the date of its promulgation, any more change will be notified separately. CCC Group (Zhejiang China ',
        'Commodities City Group Co., Ltd.) reserves the rights to interpret this incentive measures.'
      ]
    }
  },
  components: {
    navbar,
    Footer
  },
  methods: {
    submitForm(formName) {
       this.$refs[formName].validate(async (valid) => {
        const params = {
          lang: this.keys[this.language],
          surname: this.model.surname,
          name: this.model.name,
          sex: this.model.sex,
          birthday: this.model.birthday,
          passport: this.model.passportId,
          issue_country: this.model.passportCountry, // 护照发放国家id
          phone: this.model.domesticTel,
          abroad_phone: this.model.overseasTel,
          email: this.model.email,
          purchaser_type: this.typekeys[this.model.type],
          purchase_document: this.model.enclosure,
          flight: this.model.flightNumber,
          estimate_arrival_at: this.model.arrivalDate,
          purchase_voucher: this.model.purchaseRecordFile,
          purchase_records: this.model.accessRecordsFile,
          accommodation_type: this.model.type===1?'own':this.accommodationType[this.model.addressRadio],
          accommodation_free_begin: this.model.arrivalDate,
          accommodation_free_end: this.model.endTime,
          air_company: this.model.airlineCompany,
          departure_at: this.model.departureDate,
          company: this.model.companyName,
          company_person: this.model.companyPerson,
          company_phone: this.model.companyTel,
          accept_policy: this.model.checked,
          is_transfer: this.model.flightRadio,
          transfer_air_company: this.model.zhuanairlineCompany,
          transfer_flight: this.model.zhuanflightNumber,
          transfer_departure_at: this.model.zhuandepartureDate
        }
        // if((this.model.type===1 || this.model.type === 3)&&!this.model.enclosure.length) {
        //   this.$message.error('请上传附件')
        // } else if (this.model.type===2 && !this.model.accessRecordsFile) {
        //   this.$message.error('请上传出入记录')
        // } else if(this.model.type===2 && !this.model.purchaseRecordFile) {
        //   this.$message.error('请上传采购记录')
        // }
        let isfile = false
        console.log('11111111',this.model.enclosure)
        if(!this.model.checked) {
          let lang = this.$store.getters['app/language']
          if(lang == 'zh'){
            this.$message.error('请确认已接受《关于外籍采购商来义采购的奖励办法》')
          }else{
            this.$message.error('Please aware of and accept《Subsidy policy measures for Foreign Buyers’ procurements in Yiwu.》')
          }
        }
        if((this.model.type===1 || this.model.type === 3)&&!this.model.enclosure.length) {
          let lang = this.$store.getters['app/language']
          if(lang == 'zh'){
            this.$message.error('请上传附件')
          }else {
            this.$message.error('please check Attachments')
          }

        } else if (this.model.type===2 && !this.model.accessRecordsFile) {
          let lang = this.$store.getters['app/language']
          if(lang == 'zh'){
            this.$message.error('请上传出入记录')
          }else {
            this.$message.error('please check Record of staying in Yiwu')
          }
        } else if(this.model.type===2 && !this.model.purchaseRecordFile) {
          let lang = this.$store.getters['app/language']
          if(lang == 'zh'){
            this.$message.error('请上传采购记录')
          }else {
            this.$message.error('please check Purchase Record')
          }
        } else {
          isfile = true
        }
        if (valid && this.model.checked && isfile) {
          let lang = this.$store.getters['app/language']
          try {
            const res = await apiApplication.submitform({
              data: params
            })
            console.log('提交成功',res)
            if(lang == 'zh'){
              this.$message.success("提交成功")
            }else {
              this.$message.success('Submit successfully')
            }
            setTimeout(() => {
              this.$router.push("/dashboard");
            }, 1000);
          } catch (err){
            console.log(err)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!new RegExp("(jpg|jpeg|gif|png|pdf)+","gi").test(file.type)){
        this.$message.error('上传文件类型必须是JPG、JPEG、PNG、GIF或者PDF!');
        return false;
      }
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }
      return isLt2M;
    },
    uploadsucess(response, file, fileList) {
      if(file.name) {
        this.model.enclosure.push({
          name: file.name,
          uid: file.uid,
          url: file.response.real_file_path
        })
      }
    },
    uploadsucess2(response, file, fileList) {
      if(file.name) {
        this.model.accessRecordsFile.push({
          name: file.name,
          url: file.response.real_file_path
        })
      }
    },
    uploadsucess3(response, file, fileList) {
      if(file.name) {
        this.model.purchaseRecordFile.push({
          name: file.name,
          url: file.response.real_file_path
        })
      }

    },
    handleRemove(file, fileList) {
      let _tmp = this.model.enclosure;
      for (var i = 0, len = _tmp.length; i < len; i++) {
        if (_tmp[i].name == file.name) {
          _tmp.splice(i, 1);
          break;
        }
      }
      this.model.enclosure = _tmp;
    },
    handleRemove2(file, fileList) {
      let _tmp = this.model.accessRecordsFile;
      for (var i = 0, len = _tmp.length; i < len; i++) {
        if (_tmp[i].name == file.name) {
          _tmp.splice(i, 1);
          break;
        }
      }
      this.model.accessRecordsFile = _tmp;
    },
    handleRemove3(file, fileList) {
      let _tmp = this.model.purchaseRecordFile;
      for (var i = 0, len = _tmp.length; i < len; i++) {
        if (_tmp[i].name == file.name) {
          _tmp.splice(i, 1);
          break;
        }
      }
      this.model.purchaseRecordFile = _tmp;
    },
    startTimeChange() {
      this.model.endTime = ''
    },
    typeChange() {
      if(this.model.type===1 || this.model.type===3) {
        this.model.accessRecordsFile = []
        this.model.purchaseRecordFile = []
      } else {
        this.model.enclosure = []
      }
    },
    async getCountry() {
      const options = {
        params: {
          lang: this.keys[this.language]
        }
      }
      try {
        const areaList = await apiApplication.getCountry(options)
        console.log('国家===',areaList)
        this.passportCountryOptions = areaList.list.map(v => {
          return {
            label: v.name,
            value: v.id
          }
        })
        // this.passportCountryOptions = areaList.list
      } catch(err) {
        console.log(err)
      }
    }
  },
  computed: {
    endTimeOptions() {
      let timeRange = null
      let startTime = new Date(this.model.arrivalDate).getTime()
      const case1 = new Date('2020-03-01').getTime()
      const case2 = new Date('2020-03-01').getTime()
      const case3 = new Date('2020-03-11').getTime()
      if (this.model.type===2) {
        if(startTime<case1) {
          timeRange = startTime+6 * 24 * 3600 * 1000
        } else if(case2<startTime<case3) {
          timeRange = startTime+3 * 24 * 3600 * 1000
        } else {
          timeRange = 0
        }
      } else if (this.model.type === 3) {
         if(startTime<case3) {
          timeRange = startTime+3 * 24 * 3600 * 1000
        } else {
          timeRange = 0
        }
      }
      return {
        disabledDate(time) {
          if(timeRange) {
            return time.getTime() > timeRange || time.getTime() < startTime
          } else {
            return time.getTime() < startTime
          }
        }
      }
    },
    language () {
      return this.$store.getters['app/language']
    },
    arrivalDate() {
      return this.model.arrivalDate
    },
    policy(){
      let lang = this.$store.getters['app/language']
      if(lang == "zh"){
        return this.policyZh
      }else {
        return this.policyEn
      }
    },
    rules() {
        return {
            name: [
            { required: true, message: this.$t('application.nameRule'), trigger: 'blur' }
          ],
          surname: [
            { required: true, message: this.$t('application.surnameRule'), trigger: 'blur' }
          ],
          sex: [
            { required: true, message: this.$t('application.sexRule'), trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: this.$t('application.birthdayRule'), trigger: 'blur' }
          ],
          passportId: [
            { required: true, message: this.$t('application.passportNumberRule'), trigger: 'blur' }
          ],
          passportCountry: [
            { required: true, message: this.$t('application.passportCountryRule'), trigger: 'blur' }
          ],
          arrivalDate: [
            { required: true, message: this.$t('application.birthdayArrivalDate'), trigger: 'blur' }
          ],
          overseasTel: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          domesticTel: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          email: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          airlineCompany: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          flightNumber: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          departureDate: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          endTime : [
            { required: true, message: this.$t('application.endtimeRule'), trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          companyPerson: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          companyTel: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          zhuanairlineCompany: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          zhuanflightNumber: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ],
          zhuandepartureDate: [
            { required: true, message: this.$t('application.emptyRule'), trigger: 'blur' }
          ]
        }
      },
  },
  created() {
    this.getCountry()
    if(document.body.clientWidth<500) {
      this.width = '95%'
      this.width2 = '90%'
    } else {
      this.width = '50%'
      this.width2 = '424px'
    }
  },
  watch: {
    arrivalDate: {
      handler: function(val) {
        if(new Date(val).getTime()>new Date('2020-03-10').getTime()) {
          // console.log('this.timeDisadbed===',this)
          this.timeDisadbed = true
          this.model.addressRadio = 2
        }
      }
    },
    language:{
      handler:function(val) {
        console.log('val---',val)
        this.getCountry();
        this.$nextTick(()=>{
          this.$refs.form.clearValidate()
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/
  .el-upload--picture-card {
    width: 50px;
    height:50px;
    line-height: 55px;
    // margin-top: 10px;
  }
  /deep/ {
    .el-upload-list--picture-card .el-upload-list__item {
      margin-top: 0 !important;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 50px;
      height: 50px;
      margin-top: 10px;
    }
    .el-radio__input.is-checked .el-radio__inner,
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background: #189D50;
      color: #189D50;
    }
    .el-radio__input.is-checked+.el-radio__label,
    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #189D50;
    }
    .el-button--primary {
      background: #189D50;
      border-color: #189D50;
    }
  }

/deep/ .el-radio {
  color: #606266;
  cursor: pointer;
  margin: 10px 10px;
  display: flex;
}

/deep/ .el-radio span{
  white-space: pre-wrap;
  line-height:20px;
}

.application {
  width: 100%;
  background: #F7F7F7;
  padding: 90px 0 0;
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
  .policy-wp {
    width: 800px;
  }
  .sendEmail {
    // height: 25px;
    // line-height: 25px;
    width: 800px;
    margin: 0 auto;
    font-size: 14px;
    padding:38px 0px 14px;
    a {
      color: #4D78B0;
    }
  }
  .block {
    display: block;
  }
  .file-wp {
    background: #F8F8FA;
    padding: 13px;
    margin-bottom: 20px;
  }
  .file-list {
    display: flex;
    align-items: center;
    .left {
      font-size: 13px;
      color: #555555;
    }
    margin-bottom: 10px;
  }
  .cue {
    font-size: 12px;
    color: #189D50;
    line-height: 20px;
  }
  // .mb-10 {
  //   margin-bottom: 10px;
  // }
  .ct {
    padding: 0 140px;
    width: 800px;
    margin: 0 auto;
    background: #fff;
  }
  .slgon {
    color: #189D50;
    font-size: 20px;
    padding: 38px 0 20px;
    text-align: center;
    border-bottom: 1px dashed #E5E5E5;
    margin-bottom: 29px;
  }
  .title {
    font-size: 14px;
    color: #333333;
    margin-bottom: 8px;
  }
  .cue {
    font-size: 12px;
    color: #189D50;
  }
  .explain {
    padding: 12px 20px;
    color: #189D50;
    font-size: 12px;
    background: #F8F8FA;
    // display: flex;
    margin-bottom: 5px;
    p,.left {
      line-height: 20px;
    }
    .right{
      // flex: 1;
    }
    .left {
      // width: 38px;
    }
  }
  .label-name {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    margin-left: 15px;
  }
  .address {
    background: #F8F8FA;
    padding: 0;
    margin-bottom: 20px;
  }
  .bottom {
    padding-top: 23px;
    p {
      font-size: 12px;
      color: #333333;
      line-height: 20px;
    }
  }
  .link {
    color: #189D50;
    &:hover{
      cursor:pointer
    }
  }
  .submiy-btn {
    display: block;
    margin: 0 auto;
  }
  .el-dialog__body {
    ul {
      li {
        line-height: 20px;
      }
    }
  }
  .question-icon {
    width: 16px;
    vertical-align: middle;
    margin-left: 10px;
    margin-top:30px
  }
  .title-zhuan {
    font-size: 14px;
    color: #333333;
    margin-bottom: 15px;
    text-align: center;
  }

  .illustration {
    width: 80%;
    margin: 0 auto;
  }
  .bold-txt {
    font-weight: bold;
  }
}
@media screen and (max-width: 500px) {
  .application {
    width: 100%;
    .ct {
      padding: 0 20px;
      max-width: 100%;
      margin: 0 auto;
    }
    .sendEmail {
      max-width: 100%;
      margin: 0 auto;
      padding: 82px 10px 10px;
    }
    .policy-wp {
      width: 100%;
    }
  }
  /deep/ {
    .el-input {
      font-size: 12px;
    }
  }
}
</style>
