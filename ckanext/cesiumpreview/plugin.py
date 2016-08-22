import logging

import ckan.plugins as p

log = logging.getLogger(__name__)

try:
    import os
    import ckanext.resourceproxy.plugin as proxy
except ImportError:
    pass


class CesiumPreview(p.SingletonPlugin):
    '''This extension adds Cesium. '''
    p.implements(p.IConfigurer, inherit=True)
    p.implements(p.IConfigurable, inherit=True)
    if p.toolkit.check_ckan_version(min_version='2.3'):
        p.implements(p.IResourceView, inherit=True)
    else:
        p.implements(p.IResourcePreview, inherit=True)

    Cesium_Formats = ['wms', 'wfs', 'kml', 'kmz', 'gjson', 'geojson', 'czml', 'aus-geo-csv', 'csv-geo-au']
    proxy_is_enabled = False

    def update_config(self, config):
        p.toolkit.add_public_directory(config, 'theme/public')
        p.toolkit.add_template_directory(config, 'theme/templates')
        p.toolkit.add_resource('theme/public', 'ckanext-cesiumpreview')

    def configure(self, config):
        enabled = config.get('ckan.resource_proxy_enabled', False)
        self.proxy_is_enabled = enabled

    def can_preview(self, data_dict):
        resource = data_dict['resource']
        format_lower = resource['format'].lower()
        if format_lower == '':
            format_lower = os.path.splitext(resource['url'])[1][1:].lower()
        if format_lower in self.Cesium_Formats:
            if resource.get('on_same_domain') or self.proxy_is_enabled:
                return {'can_preview': True, 'quality': 2}
            else:
                return {'can_preview': True,
                        'fixable': 'Enable resource_proxy',
                        'quality': 2}
        return {'can_preview': False}

    def info(self):
        return {'name': 'cesium_view', 'title': 'National Map', 'always_available': True,
                'default_title': 'National Map', 'icon': 'globe'}

    def can_view(self, data_dict):
        resource = data_dict['resource']
        format_lower = resource.get('format', '').lower()
        if format_lower == '':
            format_lower = os.path.splitext(resource['url'])[1][1:].lower()
        if format_lower in self.Cesium_Formats:
            return True
        return False

    def preview_template(self, context, data_dict):
        return 'cesium.html'

    def view_template(self, context, data_dict):
        return 'cesium.html'
