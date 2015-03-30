// json preview module
ckan.module('cesiumpreview', function (jQuery, _) {
  return {
    initialize: function () {
      var self = this;
	  
//      var vis_server = 'http://localhost';  //local
      var vis_server='http://nationalmap.nicta.com.au/';
      
var config = {
    "version": "0.0.03",
    "initSources": ["init/nm.json", {
        "catalog": [{
            "type": "group",
            "name": "User-Added Data",
            "description": "The group for data that was added by the user via the Add Data panel.",
            "isUserSupplied": true,
            "isOpen": true,
            "items": [{
                "type": "kml",
                "name": "User Data",
                "description": "",
                "isUserSupplied": true,
                "nowViewingIndex": 0,
                "rectangle": [-180, -90, 180, 90],
                "isEnabled": true,
                "isShown": true,
                "isLegendVisible": true,
                "isLoading": false,
                "url": "http://"
            }]
        }], "catalogIsUserSupplied": true
    }, {
        "catalog": [{
            "name": "User-Added Data",
            "items": [{
                "name": "User Data",
                "nowViewingIndex": 0,
                "isEnabled": true,
                "isShown": true,
                "isLegendVisible": true
            }]
        }], "catalogOnlyUpdatesExistingItems": true
    }, {
        "camera": {
            "west": 98.75457102072903,
            "south": -38.23888882439237,
            "east": 170.25307253671946,
            "north": -8.982662391792923,
            "position": {"x": -7707123.2685200665, "y": 7841779.252596195, "z": -5606324.223295518},
            "direction": {"x": 0.6244648002125203, "y": -0.635375216364417, "z": 0.4542488830205394},
            "up": {"x": -0.31840886092857157, "y": 0.3239719818250586, "z": 0.8908748241334995}
        }
    }]
};

config["initSources"][1]['catalog'][0]['items'][0]['url'] = preload_resource['url'];
config["initSources"][1]['catalog'][0]['items'][0]['type'] = preload_resource['format'].toLowerCase();
if (config["initSources"][1]['catalog'][0]['items'][0]['type'] == 'wms') {
config["initSources"][1]['catalog'][0]['items'][0]['type'] = 'wms-getCapabilities';
}
      var encoded_config = encodeURIComponent(JSON.stringify(config));
      var style = 'height: 600px; width: 100%; border: none;';
      var display = 'allowFullScreen mozAllowFullScreen webkitAllowFullScreen';

      var html = '<iframe src="' + vis_server + '#start=' + encoded_config + '" style="' + style + '" ' + display + '></iframe>';
      
      console.log(html);
      
      self.el.html(html);
    }
  };
});
