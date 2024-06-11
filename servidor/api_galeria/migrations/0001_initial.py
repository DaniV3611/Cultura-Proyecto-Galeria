# Generated by Django 5.0.6 on 2024-06-11 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Matriz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('fecha', models.CharField(max_length=50, null=True)),
                ('ano', models.IntegerField(null=True)),
                ('ubicacion', models.CharField(max_length=200, null=True)),
                ('descripcion', models.TextField()),
                ('link', models.CharField(max_length=200, null=True)),
                ('afectos', models.CharField(max_length=200)),
            ],
        ),
    ]