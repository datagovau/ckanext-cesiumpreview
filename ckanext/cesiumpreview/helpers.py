import ckan.logic as logic

def get_helpers():
    return dict(
        get_package_data=get_package_data
    )


def get_package_data(id):
    data = logic.get_action(
        'package_show')({},{"id":id})
    return data