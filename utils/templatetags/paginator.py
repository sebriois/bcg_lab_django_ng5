import math

from django.conf import settings
from django.utils.html import escape
from django.utils.safestring import mark_safe
from django.template import Library
from django.utils.http import urlencode

register = Library()

DOT = '.'


def get_query_string(context, other_params={}):
    url_args = context.get('url_args', '')
    if other_params:
        if url_args:
            url_args += '&%s' % urlencode(other_params)
        else:
            url_args = '%s' % urlencode(other_params)

    return '?%s' % url_args


def paginator_number(context, current_page, i):
    """
    Generates an individual page index link in a paginated list.
    """
    if i == DOT:
        return u'... '
    elif i + 1 == current_page:
        return mark_safe(u'<span class="this-page">%d</span> ' % current_page)
    else:
        return mark_safe(u'<a href="%s" class="show_wait">%d</a> ' % (
            escape(get_query_string(context, {'page': i + 1})),
            i + 1
        )
                         )


paginator_number = register.simple_tag(paginator_number)


def pagination(context, page):
    """
    Generates the series of links to the pages in a paginated list.
    """
    paginator, page_num = page.paginator, page.number

    pagination_required = paginator.num_pages > 1
    if not pagination_required:
        page_range = []
    else:
        ON_EACH_SIDE = 3
        ON_ENDS = 2

        # If there are 10 or fewer pages, display links to every page.
        # Otherwise, do some fancy
        if paginator.num_pages <= 10:
            page_range = range(paginator.num_pages)
        else:
            # Insert "smart" pagination links, so that there are always ON_ENDS
            # links at either end of the list of pages, and there are always
            # ON_EACH_SIDE links at either end of the "current page" link.
            page_range = []
            if page_num > (ON_EACH_SIDE + ON_ENDS):
                page_range.extend(range(0, ON_EACH_SIDE - 1))
                page_range.append(DOT)
                page_range.extend(range(page_num - ON_EACH_SIDE, page_num + 1))
            else:
                page_range.extend(range(0, page_num + 1))
            if page_num < (paginator.num_pages - ON_EACH_SIDE - ON_ENDS - 1):
                page_range.extend(range(page_num + 1, page_num + ON_EACH_SIDE + 1))
                page_range.append(DOT)
                page_range.extend(range(paginator.num_pages - ON_ENDS, paginator.num_pages))
            else:
                page_range.extend(range(page_num + 1, paginator.num_pages))

    return {
        'context': context,
        'page': page,
        'pagination_required': pagination_required,
        'page_range': page_range,
    }


pagination = register.inclusion_tag('pagination.html', takes_context=True)(pagination)


def autopaginate(context, current_page, num_rows):
    ON_EACH_SIDE = 3
    ON_ENDS = 2
    num_pages = int(math.ceil(float(num_rows) / settings.PAGINATION_ROWS))

    # If there are 10 or fewer pages, display links to every page.
    # Otherwise, do some fancy
    if num_pages <= 10:
        page_range = range(num_pages)
    else:
        # Insert "smart" pagination links, so that there are always ON_ENDS
        # links at either end of the list of pages, and there are always
        # ON_EACH_SIDE links at either end of the "current page" link.
        page_range = []
        if current_page > (ON_EACH_SIDE + ON_ENDS):
            page_range.extend(range(0, ON_EACH_SIDE - 1))
            page_range.append(DOT)
            page_range.extend(range(current_page - ON_EACH_SIDE, current_page + 1))
        else:
            page_range.extend(range(0, current_page + 1))

        if current_page < (num_pages - ON_EACH_SIDE - ON_ENDS - 1):
            page_range.extend(range(current_page + 1, current_page + ON_EACH_SIDE + 1))
            page_range.append(DOT)
            page_range.extend(range(num_pages - ON_ENDS, num_pages))
        else:
            page_range.extend(range(current_page + 1, num_pages))

    return {
        'context': context,
        'current_page': current_page,
        'page_range': page_range,
    }


autopaginate = register.inclusion_tag('pagination.html', takes_context=True)(autopaginate)
