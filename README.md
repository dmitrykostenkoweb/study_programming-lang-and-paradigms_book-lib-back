# Budowa systemu zarządzania biblioteką

Zadanie zbudowania Systemu Zarządzania Biblioteką, który może zarządzać inwentarzem książek i prowadzić ewidencję wypożyczeń. System powinien być zbudowany z wykorzystaniem koncepcji programowania obiektowego.

## Każde z poniższych wymagań powinno być zrealizowane w postaci osobnej metody (procedury).

## Oto wymagania dla systemu:

* System powinien być w stanie śledzić następujące informacje o każdej książce: tytuł, autor, rok wydania, wydawca, numer ISBN, gatunek oraz liczbę dostępnych egzemplarzy.
* System powinien umożliwiać bibliotekarzom dodawanie nowych książek do spisu, usuwanie książek ze spisu oraz aktualizację informacji o istniejących książkach.
* System powinien umożliwiać użytkownikom wyszukiwanie książek według tytułu, autora lub gatunku.
* System powinien śledzić zapisy dotyczące wypożyczeń każdej książki, w tym imię i nazwisko wypożyczającego, datę wypożyczenia książki oraz datę, kiedy książka ma być zwrócona.
* System powinien umożliwiać bibliotekarzom przeglądanie listy wszystkich książek znajdujących się w inwentarzu, jak również listy wszystkich wypożyczonych książek i ich użytkowników.
* Twoim zadaniem jest zaprojektowanie i implementacja tego systemu zarządzania biblioteką z wykorzystaniem zasad programowania obiektowego. Powinieneś stworzyć klasy dla obiektów Książka, Biblioteka i Pożyczający, a także inne potrzebne klasy. Powinieneś także dołączyć metody dodawania, usuwania i aktualizacji książek, jak również wyszukiwania książek i śledzenia rekordów wypożyczeń.


## Usage

# kill port 3000 in windows
* Open Command Prompt by pressing the Windows key and typing "cmd".
* Run the command `netstat -ano | findstr :3000`.
* Look for the line that says "TCP 0.0.0.0:3000" and note the PID (process identifier) number on the right side of the line.
* Run the command `taskkill /pid <PID number> /f` where <PID number> is the number you noted in step 3. This will display the name of the process using the port.
