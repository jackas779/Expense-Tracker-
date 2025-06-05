# Expense-Tracker
Build a simple expense tracker to manage your finances. 

Proyecto realizo con los requisitos propuestos de la pagina de roadmap para mas detalles de los requisitos ir a la siguiente url  [Roadmap](https://roadmap.sh/projects/task-tracker)

# 📊 Expense Tracker CLI

Una herramienta de línea de comandos para gestionar gastos personales con almacenamiento persistente en JSON.

## 🚀 Instalación Global

Sigue estos pasos para instalar Task Tracker CLI globalmente en tu sistema y poder ejecutar el comando `expense-tracker` desde cualquier terminal:

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/jackas779/Task-Tracket.git](https://github.com/jackas779/Expense-Tracker-.git)
    cd Expense-Tracker-
    ```

2.  **Instalar Globalmente:**
    Desde el directorio raíz del proyecto clonado, ejecuta el siguiente comando para instalar la CLI globalmente usando npm:
    ```bash
    npm install -g .
    ```
    El punto (`.`) al final indica a npm que instale el paquete ubicado en el directorio actual de forma global.

3.  **Verificar Instalación:**
    Una vez completada la instalación, deberías poder ejecutar el comando `expense-tracker` desde cualquier ventana de terminal nueva. Prueba ejecutando el comando help:
    ```bash
    expense-tracker help
    ```
    Si ves el mensaje de ayuda, ¡la instalación fue exitosa!

## Desinstalación Global

Para eliminar Task Tracker CLI de tu instalación global de npm, usa el siguiente comando:

```bash
  npm uninstall -g task-tracker #[O el nombre exacto de tu paquete en package.json]
```

## 📋 Uso Basico
```bash
  expense [comando] [opciones]
```

# 🛠 Comandos principales

## ➕ add - Añadir nuevo gasto
```bash
  expense add --description "Descripción" --amount [cantidad]
```

### Opciones:

--description: Texto descriptivo (mín. 5 caracteres)
--amount: Valor numérico (mayor que 0)

## 📜 list - Mostrar todos los gastos

```bash 
  expense update --[propiedad] [valor] --[campo] [nuevo-valor]
```

### Ejemplos:

```bash 
  expense update --id 1 --amount 150
  expense update --description "Antigua" --description "Nueva"
```

## 🗑 delete - Eliminar gasto
```bash 
  expense delete --id [ID]
```

## expense delete --id [ID]

```bash 
  expense summary [--month 1-12]
```
Muestra el total acumulado (opcionalmente filtrado por mes)

## 🆘 Ayuda adicional

```bash 
  expense help
```

# 🎨 Ejemplos prácticos
## 1.Registrar nuevo gasto

```bash 
  expense add --description "Gasolina" --amount 45.80
```

✅ Gasto añadido satisfactoriamente (ID: 7)

## 2. Listar todos los gastos

```bash 
  expense list
```
```bash 
  ┌────┬──────────────────────┬────────┬───────────────┐
  │ ID │ Descripción          │ Amount │ Date          │
  ├────┼──────────────────────┼────────┼───────────────┤
  │ 1  │ Supermercado         │ 125.50 │ 2023/05/15    │
  │ 2  │ Gasolina             │  45.80 │ 2023/05/18    │
  └────┴──────────────────────┴────────┴───────────────┘
```

## 3. Actualizar gasto existente

```bash 
  expense update --id 2 --amount 50.00
```

✅ Gasto actualizado satisfactoriamente.


 4. Resumen mensual

```bash 
  expense summary --month 5
```
```bash 
  # Total expenses: $895.30
```

## 5. Eliminar gasto

```bash 
  expense delete --id 3
```

✅ Gasto eliminado satisfactoriamente.

# 🛠️ Requisitos del sistema
Node.js v16+

5MB de espacio libre

Permisos de escritura en ~/.expense-tracker/

# 📜 Licencia
MIT © 2025 [Nicolas Ardila]