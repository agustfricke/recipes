#!/bin/bash

# Verificar si se proporcionó una cadena como argumento
if [ -z "$1" ]; then
  echo "Uso: $0 <cadena_de_texto>"
  exit 1
fi

# Contar los caracteres de la cadena proporcionada
char_count=${#1}

# Mostrar el resultado
echo "La cadena proporcionada tiene $char_count caracteres."
