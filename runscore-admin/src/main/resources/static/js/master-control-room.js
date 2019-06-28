var masterControlRoomVM = new Vue({
	el : '#master-control-room',
	data : {
		/**
		 * 邀请注册start
		 */
		regitserDefaultRebate : '',
		inviteCodeEffectiveDuration : '',
		inviteRegisterEnabled : false,
		/**
		 * 商户订单start
		 */
		receiveOrderEffectiveDuration : '',
		orderPayEffectiveDuration : '',
		receiveOrderUpperLimit : '',
		cashDepositMinimumRequire : '',
		unfixedGatheringCodeReceiveOrder : false,
		/**
		 * 充值start
		 */
		rechargeOrderEffectiveDuration : '',
		rechargeReturnWaterRate : '',
		rechargeReturnWaterRateEnabled : false,

		/**
		 * 客服二维码start
		 */
		qrcodeStorageIds : [],
		tmpQrcodeStorageIds : '',
		uploadQrcodeFlag : false,

		/**
		 * 刷新缓存start
		 */
		refreshConfigItem : true,
		refreshDict : true
	},
	computed : {},
	created : function() {
	},
	mounted : function() {
		var that = this;
		that.loadInviteRegisterSetting();
		that.loadReceiveOrderSetting();
		that.loadRechargeSetting();
		that.loadCustomerQrcodeSetting();

		$('.qrcode-pic').on('filebatchuploadsuccess', function(event, data) {
			that.tmpQrcodeStorageIds = data.response.data.join(',');
			that.updateCustomerQrcodeSetting();
		});
	},
	methods : {

		loadInviteRegisterSetting : function() {
			var that = this;
			that.$http.get('/masterControl/getInviteRegisterSetting').then(function(res) {
				if (res.body.data != null) {
					that.regitserDefaultRebate = res.body.data.regitserDefaultRebate;
					that.inviteCodeEffectiveDuration = res.body.data.effectiveDuration;
					that.inviteRegisterEnabled = res.body.data.enabled;
				}
			});
		},

		updateInviteRegisterSetting : function() {
			var that = this;
			var regitserDefaultRebate = that.regitserDefaultRebate;
			if (regitserDefaultRebate == null || regitserDefaultRebate == '') {
				layer.alert('请输入注册默认返点', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			var inviteCodeEffectiveDuration = that.inviteCodeEffectiveDuration;
			if (inviteCodeEffectiveDuration == null || inviteCodeEffectiveDuration == '') {
				layer.alert('请输入邀请码有效时长', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			var inviteRegisterEnabled = that.inviteRegisterEnabled;
			if (inviteRegisterEnabled == null) {
				layer.alert('请选择是否开启', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			that.$http.post('/masterControl/updateInviteRegisterSetting', {
				regitserDefaultRebate : regitserDefaultRebate,
				effectiveDuration : inviteCodeEffectiveDuration,
				enabled : inviteRegisterEnabled,
			}, {
				emulateJSON : true
			}).then(function(res) {
				layer.alert('操作成功!', {
					icon : 1,
					time : 3000,
					shade : false
				});
				that.loadInviteRegisterSetting();
			});
		},

		loadReceiveOrderSetting : function() {
			var that = this;
			that.$http.get('/masterControl/getReceiveOrderSetting').then(function(res) {
				if (res.body.data != null) {
					that.receiveOrderEffectiveDuration = res.body.data.receiveOrderEffectiveDuration;
					that.orderPayEffectiveDuration = res.body.data.orderPayEffectiveDuration;
					that.receiveOrderUpperLimit = res.body.data.receiveOrderUpperLimit;
					that.cashDepositMinimumRequire = res.body.data.cashDepositMinimumRequire;
					that.unfixedGatheringCodeReceiveOrder = res.body.data.unfixedGatheringCodeReceiveOrder;
				}
			});
		},

		updateReceiveOrderSetting : function() {
			var that = this;
			var receiveOrderEffectiveDuration = that.receiveOrderEffectiveDuration;
			if (receiveOrderEffectiveDuration == null || receiveOrderEffectiveDuration == '') {
				layer.alert('请输入接单有效时长', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			var orderPayEffectiveDuration = that.orderPayEffectiveDuration;
			if (orderPayEffectiveDuration == null || orderPayEffectiveDuration == '') {
				layer.alert('请输入支付有效时长', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			var receiveOrderUpperLimit = that.receiveOrderUpperLimit;
			if (receiveOrderUpperLimit == null || receiveOrderUpperLimit == '') {
				layer.alert('请输入接单数量上限', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			var cashDepositMinimumRequire = that.cashDepositMinimumRequire;
			if (cashDepositMinimumRequire == null || cashDepositMinimumRequire == '') {
				layer.alert('请输入保证金最低要求金额', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			var unfixedGatheringCodeReceiveOrder = that.unfixedGatheringCodeReceiveOrder;
			if (unfixedGatheringCodeReceiveOrder == null) {
				layer.alert('请选择是否支持不固定金额收款码接单', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}

			that.$http.post('/masterControl/updateReceiveOrderSetting', {
				receiveOrderEffectiveDuration : receiveOrderEffectiveDuration,
				orderPayEffectiveDuration : orderPayEffectiveDuration,
				receiveOrderUpperLimit : receiveOrderUpperLimit,
				cashDepositMinimumRequire : cashDepositMinimumRequire,
				unfixedGatheringCodeReceiveOrder : unfixedGatheringCodeReceiveOrder
			}, {
				emulateJSON : true
			}).then(function(res) {
				layer.alert('操作成功!', {
					icon : 1,
					time : 3000,
					shade : false
				});
				that.loadReceiveOrderSetting();
			});
		},

		loadRechargeSetting : function() {
			var that = this;
			that.$http.get('/masterControl/getRechargeSetting').then(function(res) {
				if (res.body.data != null) {
					that.rechargeOrderEffectiveDuration = res.body.data.orderEffectiveDuration;
					that.rechargeReturnWaterRate = res.body.data.returnWaterRate;
					that.rechargeReturnWaterRateEnabled = res.body.data.returnWaterRateEnabled;
				}
			});
		},

		updateRechargeSetting : function() {
			var that = this;
			var rechargeOrderEffectiveDuration = that.rechargeOrderEffectiveDuration;
			if (rechargeOrderEffectiveDuration == null || rechargeOrderEffectiveDuration == '') {
				layer.alert('请输入充值订单有效时长', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			var rechargeReturnWaterRate = that.rechargeReturnWaterRate;
			if (rechargeReturnWaterRate == null || rechargeReturnWaterRate == '') {
				layer.alert('请输入充值返水率', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			var rechargeReturnWaterRateEnabled = that.rechargeReturnWaterRateEnabled;
			if (rechargeReturnWaterRateEnabled == null) {
				layer.alert('请选择是否启用', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}

			that.$http.post('/masterControl/updateRechargeSetting', {
				orderEffectiveDuration : rechargeOrderEffectiveDuration,
				returnWaterRate : rechargeReturnWaterRate,
				returnWaterRateEnabled : rechargeReturnWaterRateEnabled
			}, {
				emulateJSON : true
			}).then(function(res) {
				layer.alert('操作成功!', {
					icon : 1,
					time : 3000,
					shade : false
				});
				that.loadRechargeSetting();
			});
		},

		loadCustomerQrcodeSetting : function() {
			var that = this;
			that.$http.get('/masterControl/getCustomerQrcodeSetting').then(function(res) {
				if (res.body.data != null) {
					that.qrcodeStorageIds = res.body.data.qrcodeStorageIds.split(',');
				} else {
					that.qrcodeStorageIds = [];
				}
			});
		},

		showUploadQrcodeModal : function() {
			this.uploadQrcodeFlag = true;
			$('.qrcode-pic').fileinput('destroy').fileinput({
				uploadAsync : false,
				browseOnZoneClick : true,
				showBrowse : false,
				showCaption : false,
				showClose : true,
				showRemove : false,
				showUpload : false,
				dropZoneTitle : '点击选择二维码',
				dropZoneClickTitle : '',
				layoutTemplates : {
					footer : ''
				},
				maxFileCount : 2,
				uploadUrl : '/storage/uploadPic',
				enctype : 'multipart/form-data',
				allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' ],
				initialPreview : [],
				initialPreviewAsData : true,
				initialPreviewConfig : []
			});
		},

		uploadQrcode : function() {
			var filesCount = $('.qrcode-pic').fileinput('getFilesCount');
			if (filesCount == 0) {
				layer.alert('请选择要上传的二维码', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			$('.qrcode-pic').fileinput('upload');
		},

		updateCustomerQrcodeSetting : function() {
			var that = this;
			var tmpQrcodeStorageIds = that.tmpQrcodeStorageIds;
			that.$http.post('/masterControl/updateCustomerQrcodeSetting', {
				qrcodeStorageIds : that.tmpQrcodeStorageIds
			}, {
				emulateJSON : true
			}).then(function(res) {
				layer.alert('操作成功!', {
					icon : 1,
					time : 3000,
					shade : false
				});
				that.uploadQrcodeFlag = false;
				that.loadCustomerQrcodeSetting();
			});
		},

		refreshCache : function() {
			var cacheItems = [];
			var that = this;
			if (that.refreshConfigItem) {
				cacheItems.push('config*');
			}
			if (that.refreshConfigItem) {
				cacheItems.push('dict*');
			}
			if (cacheItems.length == 0) {
				layer.alert('请勾选要刷新的缓存项', {
					title : '提示',
					icon : 7,
					time : 3000
				});
				return;
			}
			that.$http.post('/masterControl/refreshCache', cacheItems).then(function(res) {
				layer.alert('操作成功!', {
					icon : 1,
					time : 3000,
					shade : false
				});
			});
		}
	}
});