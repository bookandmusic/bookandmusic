---
title: Celery任务队列
category: [Python]  
tag: [异步, celery, 定时, django]  
abbrlink: 7c4e981a  
date: 2021-10-24 02:03:05  
updated: 2023-03-02 14:20:32
order: 9
article: false
---

# Celery任务队列

　　在使用Celery至异步任务处理时，如果存在多种类型的任务，并且我们希望用不同的Worker来处理不同类型的任务时，应该如何处理呢？
本文将会讲解如何利用Celery将任务分配至不同队列，并使用不同的Worker来处理指定类型的任务。

## celery app创建

> celery版本是3.x

```python
from __future__ import absolute_import

import os

from celery import Celery

from django.conf import settings

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proj.settings')

app = Celery('proj')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings')

# celery会自动查找每个app的 tasks文件中的任务
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))

```

> 如果是 4.x以上，需要参考[官方文档](https://docs.celeryproject.org/en/v5.1.2/django/first-steps-with-django.html#using-celery-with-django)，有不同的写法。

```python
import os

from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django01.settings')

app = Celery('proj')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
```

## 配置文件

> celery版本是3.x

```python
IS_USE_CELERY = True

if IS_USE_CELERY:
    CELERY_TIMEZONE = "Asia/Shanghai"  # 设置时区
    CELERY_ENABLE_UTC = False  # 是否启动时区设置，默认值是True

    CELERYD_CONCURRENCY = 5  # 并发的worker数量
    CELERYD_PREFETCH_MULTIPLIER = 2  # 每次去消息队列读取任务的数量，默认值是4
    CELERYD_MAX_TASKS_PER_CHILD = 120  # 每个worker执行多少次任务后会死掉

    # BROKER_URL = "amqp://guest:guest@localhost:15672/"  # 使用RabbitMQ 作为任务队列
    BROKER_URL = "redis://127.0.0.1:6379/9"  # 使用RabbitMQ 作为任务队列

    CELERY_RESULT_EXPIRES = 60 * 60 * 24 * 3  # 任务执行结果的超时时间
    # CELERYD_TIME_LIMIT = 60 * 60  # 单个任务运行的时间限制，超时会被杀死，不建议使用该参数，而用CELERYD_SOFT_TIME_LIMIT
    CELERYD_SOFT_TIME_LIMIT = 300
    CELERY_RESULT_BACKEND = "redis://127.0.0.1:6379/11"  # 使用redis存储执行结果

    CELERY_ACCEPT_CONTENT = ['pickle']
    CELERY_SERIALIZER = "pickle"  # 任务序列化方式
    CELERY_RESULT_SERIALIZER = "pickle"  # 结果的序列化方式
    CELERY_DISABLE_RATE_LIMITS = False  # 关闭执行限速

    CELERY_IMPORTS = [
        "app01.task_celery"
    ]  # 配置导入各个任务的任务模块，尤其是当任务模块名字不是 tasks时，可以手动导入

    CELERYBEAT_SCHEDULER = 'djcelery.schedulers:DatabaseScheduler'  # 指明定时模块的加载位置

    CELERYBEAT_SCHEDULE = {
        # 定时任务，每隔1分钟，记录一次时间
        'record_datetime': {
            'task': 'app01.task_celery.record_time',
            'schedule': crontab(minute='*/1'),
            'args': (),
        }
    }  # 配置定时任务

    CELERY_QUEUES = (
        Queue('Default', exchange=Exchange('default'), routing_key='default'),
        Queue('queue1', exchange=Exchange('queue1'), routing_key='queue1'),
        Queue('queue2', exchange=Exchange('queue2'), routing_key='queue2')
    )  # 定义任务执行的各个任务队列，默认有一个队列，暂称为一般任务队列。

    # 如果不指定QUEUE 那么就用Default
    CELERY_DEFAULT_QUEUE = 'Default'
    CELERY_DEFAULT_EXCHANGE = 'default'
    CELERY_DEFAULT_ROUTING_KEY = 'default'

    # CELERY_ROUTES = {
    #     "app01.tasks.add_two_num": {
    #         'queue': 'queue1',
    #         'exchange': 'queue1',
    #         'routing_key': 'queue1'
    #     }
    # }  # Celery 路由设置，配置各个任务分配到不同的任务队列

    INSTALLED_APPS = locals().get('INSTALLED_APPS', [])
    INSTALLED_APPS += [
        'djcelery'
    ]
    import djcelery

    djcelery.setup_loader()

```

> 如果是 4.x以上，需要参考[官方文档](https://docs.celeryproject.org/en/v5.1.2/userguide/configuration.html#new-lowercase-settings)，修改配置参数键名

```python
IS_USE_CELERY = True

if IS_USE_CELERY:
    CELERY_TIMEZONE = "Asia/Shanghai"  # 设置时区
    CELERY_ENABLE_UTC = False  # 是否启动时区设置，默认值是True

    CELERY_WORKER_CONCURRENCY = 5  # 并发的worker数量
    CELERY_WORKER_PREFETCH_MULTIPLIER = 2  # 每次去消息队列读取任务的数量，默认值是4
    CELERY_WORKER_MAX_TASKS_PER_CHILD = 120  # 每个worker执行多少次任务后会死掉

    # BROKER_URL = "redis://127.0.0.1:6379/9"  # 使用RabbitMQ 作为任务队列
    CELERY_BROKER_URL = "amqp://guest:guest@localhost:5672//"  # 使用RabbitMQ 作为任务队列

    CELERY_RESULT_EXPIRES = 60 * 60 * 24 * 3  # 任务执行结果的超时时间
    CELERY_TASK_TIME_LIMIT = 60 * 60  # 单个任务运行的时间限制，超时会被杀死，不建议使用该参数，而用CELERYD_SOFT_TIME_LIMIT
    CELERY_TASK_SOFT_TIME_LIMIT = 300
    # CELERY_RESULT_BACKEND = "redis://127.0.0.1:6379/11"  # 使用redis存储执行结果
    CELERY_RESULT_BACKEND = "django-db"  # 使用ORM对应的数据库存储执行结果

    CELERY_ACCEPT_CONTENT = ['pickle']
    CELERY_TASK_SERIALIZER = "pickle"  # 任务序列化方式
    CELERY_RESULT_SERIALIZER = "pickle"  # 结果的序列化方式
    CELERY_WORKER_DISABLE_RATE_LIMITS = False  # 关闭执行限速

    CELERY_IMPORTS = [
        "app01.task_celery"
    ]  # 配置导入各个任务的代码模块

    CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'  # 指明定时模块的加载位置

    CELERY_BEAT_SCHEDULE = {
        'record_datetime': {
            'task': 'app01.task_celery.record_time',
            'schedule': crontab(minute='*/1'),
            'args': (),
        }
    }  # 配置定时任务

    CELERY_TASK_QUEUES = (
        Queue('Default', exchange=Exchange('default'), routing_key='default'),
        Queue('queue1', exchange=Exchange('queue1'), routing_key='queue1'),
        Queue('queue2', exchange=Exchange('queue2'), routing_key='queue2')
    )  # 定义任务执行的各个任务队列，默认有一个队列，暂称为一般任务队列。

    # 如果不指定QUEUE 那么就用Default
    CELERY_TASK_DEFAULT_QUEUE = 'Default'
    CELERY_TASK_DEFAULT_EXCHANGE = 'default'
    CELERY_TASK_DEFAULT_ROUTING_KEY = 'default'

    # CELERY_TASK_ROUTES = {
    #     "app01.tasks.add_two_num": {
    #         'queue': 'queue1',
    #         'exchange': 'queue1',
    #         'routing_key': 'queue1'
    #     }
    # }  # Celery 路由设置，配置各个任务分配到不同的任务队列

    # INSTALLED_APPS = locals().get('INSTALLED_APPS', [])
    INSTALLED_APPS += [
        'django_celery_beat',
        'django_celery_results'
    ]
```

## task任务

> `app01/tasks.py`

```python
from celery import shared_task
import time


@shared_task
def add_two_num(x, y):
    time.sleep(10)
    return x + y
```

> `app01/task_celery.py`

```python
import os
import datetime

from django.conf import settings

from celery import shared_task


@shared_task
def record_time():
    path = os.path.join(settings.BASE_DIR, 'time.txt')
    with open(path, 'a') as f:
        f.write(f'{datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\n')

```

## 任务异步调用

> 如果任务直接在配置中指明任务队列，就不能再动态指明队列

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from app01.tasks import add_two_num


class IndexView(APIView):
    def get(self, request):
        """
        通过i值不同，模拟不同情况下，需要将任务放到不同的任务队列中执行，
        如果 celery版本是3.x，不能在配置中写死
        """
        i = request.GET.get('i', 10)
        i = int(i)
        for j in range(30):
            if i % 2 == 0:
                add_two_num.apply_async(args=[1000, 100], queue='queue1', routing_key='queue1')
            else:
                add_two_num.apply_async(args=[1000, 100], queue='queue2', routing_key='queue2')
        return Response("任务正在执行")
```

## 动态创建定时任务

> celery3.x 使用 djcelery模块和django集成，celery4.x之后，不需要使用`djcelery`，但是如果想要动态创建定时任务及存储结果到SQL数据库中，可以使用 [`django-celery-beat`](https://docs.celeryproject.org/en/v5.1.2/userguide/periodic-tasks.html#using-custom-scheduler-classes)和 [`django-celery-results`](https://docs.celeryproject.org/en/v5.1.2/django/first-steps-with-django.html#django-celery-results-using-the-django-orm-cache-as-a-result-backend)

```python
from djcelery.models import CrontabSchedule, PeriodicTask
# from django_celery_beat.models import CrontabSchedule, PeriodicTask


class TwoView(APIView):
    def get(self, request):
        a = request.data.get('a', 100)
        b = request.data.get('b', 1000)
        crontab, flag = CrontabSchedule.objects.get_or_create(minute=28, hour=23, day_of_month='*')
        task = PeriodicTask.objects.create(name='app01.tasks.add_two_num', task='app01.tasks.add_two_num', crontab=crontab, args=[a, b])

        return Response("定时任务创建成功")

```

## celery服务启动

```python
# celery3.x
python manage.py celery worker -Q queue1 -l info -n queue1@%d  # 启动beat服务
    
python manage.py celery worker -Q default -l info  # 针对默认队列启动worker服务

python manage.py celery worker -Q queue1 -l info -n queue1@%d  # 针对队列1启动worer服务

python manage.py celery worker -Q queue2 -l info -n queue2@%d  # 针对队列1启动worer服务

# celery3.x 和celery4.x
celery -A celery路径 beat -l info -Q 队列
celery -A celery路径 worker -l info -Q 队列 -c worker数
```

　　‍
