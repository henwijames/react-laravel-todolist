<!DOCTYPE html>
<html lang="en" data-theme="lofi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React x Laravel</title>
  @vite('resources/css/app.css')
  <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
  <div id="root"></div>
  @viteReactRefresh
  @vite('resources/js/app.js')
</body>
<script>
  window.env = {
    API_BASE_URL: '{{ env('API_BASE_URL') }}',
  }
</script>

</html>
