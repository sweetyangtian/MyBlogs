## Laravel

Laravel是一套简洁、优雅的PHP Web开发框架(PHP Web Framework) 

## Laravel 项目使用vue

[laravel 学院 ](http://laravelacademy.org/)

主要学习模块：
- 安装
- 目录结构
- Blade 模板
- [Laravel Mix](http://laravelacademy.org/post/6798.html )

[composer](http://www.phpcomposer.com/ )，[composer镜像](https://pkg.phpcomposer.com/ )


## 学习项目
[运用laravel5.4 + vue2.0 + elementui，从零搭建一个技术博客](https://github.com/linlianmin/laravel-vue)

## laravel-blade 语法
```php
// 判断该变量是否被设置
{{ isset($name) ? $name : 'Default' }}  或者{{ $name or 'Default' }}
```
```php
//可以使用 @ 符号来告诉 Blade 渲染引擎该表达式应该保持原生格式不作改动,@ 符将会被 Blade 移除，但是，{{ name }}表达式将会保持不变
<h1Hello, @{{ name }}. </h1 
	
```
```php
// @verbatim指令----在模板中很大一部分显示 JavaScript 变量
@verbatim
    <div class="container">
        Hello, {{ name }}.
    </div>
@endverbatim
```
```php
//If 语句
@if (count($records) === 1)
    I have one record!
@elseif (count($records) 1)
    I have multiple records!
@else
    I don't have any records!
@endif
```
```php
//循环----@forelse  @empty  @while
@for ($i = 0; $i < 10; $i++)
    The current value is {{ $i }}
@endfor
@foreach ($users as $user)
    <p>This is user {{ $user->id }}</p>
@endforeach
//在循环的时候可以使用 $loop 变量获取循环信息
@foreach ($users as $user)
    @if ($loop->first)
        This is the first iteration.
    @endif
    @if ($loop->last)
        This is the last iteration.
    @endif
    <p>This is user {{ $user->id }}，这是第{{$loop->index}}个变量</p>
@endforeach
```