// json preview module
ckan.module('cesiumpreview', function (jQuery, _) {
    return {
        initialize: function () {
            var self = this;

            var vis_server = 'https://nationalmap.gov.au/';

            var config = {
                "version": "0.0.03",
                "initSources": [{
                    "catalog": [{
                        "type": "group",
                        "name": "User-Added Data",
                        "description": "The group for data that was added by the user via the Add Data panel.",
                        "isUserSupplied": true,
                        "isOpen": true,
                        "items": [{
                            "type": "kml",
                            "name": "User Data",
                            "isUserSupplied": true,
                            "isOpen": true,
                            "isEnabled": true,
                            "url": "http://"
                        }]
                    }],
                    "catalogIsUserSupplied": true,
                    "homeCamera": {
                        "west": 105,
                        "south": -45,
                        "east": 155,
                        "north": -5
                    }

                }
                ]

            };
            // load dataset spatial extent as default home camera if available
            if (spatial != '') {
                extent = geojsonExtent(JSON.parse(spatial)); //[WSEN]
                if (extent[0] != extent[2]) {
                    config["initSources"][0]['homeCamera']['west'] = extent[0];
                    config["initSources"][0]['homeCamera']['south'] = extent[1];
                    config["initSources"][0]['homeCamera']['east'] = extent[2];
                    config["initSources"][0]['homeCamera']['north'] = extent[3];
                }
            }
            var zero_item = config["initSources"][0]['catalog'][0]['items'][0];

            zero_item['url'] = preload_resource['url'];
            if (preload_resource['url'].indexOf('http') !== 0) {
                zero_item['url'] = "http:" + preload_resource['url'];
            }
            if (preload_resource['wms_url']) {
                zero_item['url'] = preload_resource['wms_url'];
            }
            zero_item['type'] = preload_resource['format'].toLowerCase();

            if (zero_item['type'] == 'wms') {
                // if wms_layer specified in resource, display that layer/layers by default
                if (typeof preload_resource['wms_layer'] != 'undefined' &&
                        preload_resource['wms_layer'] != '') {
                    zero_item['layers'] = preload_resource['wms_layer'];
                }
                else {
                    zero_item['type'] = zero_item['type'] + '-getCapabilities';
                }
            }
            if (zero_item['type'] == 'wfs'){
                if (preload_resource['typeNames'])
                    zero_item['typeNames'] = preload_resource['typeNames'];
                else
                    zero_item['type'] = zero_item['type'] + '-getCapabilities';
            }
            if (zero_item['type'] == 'aus-geo-csv' || zero_item['type'] == 'csv-geo-au') {
                zero_item['type'] = 'csv';
            }
            var encoded_config = encodeURIComponent(JSON.stringify(config));
            var style = 'height: 600px; width: 100%; border: none;';
            var display = 'allowFullScreen mozAllowFullScreen webkitAllowFullScreen';

            var html = '<iframe src="' + vis_server + '#clean&hideExplorerPanel=1&start=' + encoded_config + '" style="' + style + '" ' + display + '></iframe>';

            console.log(html);

            self.el.html(html);
        }
    };
});
