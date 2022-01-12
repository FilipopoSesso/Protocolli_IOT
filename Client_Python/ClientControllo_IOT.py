import Package as pk
import Drones
import HttpProtocol
import MqttProtocol

def clear():
    pk.os.system('clear')
    
def parameter(ask):
    par=''
    controllo=True
    while controllo:
        par=input(f'\n{ask}:')
        if par!='' or par!=' ':
            controllo=False
    clear()
    return par

def printList(myList):
    for x in myList:
        print(f'{myList.index(x)+1}) {x}')

DRONELIST=list()
def getDroneList():
    DRONELIST=HttpProtocol.getDrones()
    print("List of drones:")
    for x in DRONELIST:
        print(f"{DRONELIST.index(x)+1}) {x['id']} ({x['model']})")
    

MODELLIST=[
                "Potensic Drone T35",
                "Potensic Drone T25",
                "DJI Mavic 2 Pro",
                "DJI Mavic Air",
                "DJI Phantom 4 pro",
                "DJI Mavic Pro",
                "DJI Phantom 4",
                "Parrot ANAFI",
                "DJI Mavic Pro Platinum",
                "DJI SPARK COMBO"
            ]

MENU="______________MENU______________\n1) Create drone\n2) Drone by name\n3) Drones list\n4) Change drone status\n5) Exit\n--------------------------------\n"
#cuore del programma
if __name__=="__main__":
    loop=True
    while loop:
        clear()
        choose=int(input(MENU))
        match choose:
            case 1:
                clear()
                name=parameter("Name")
                printList(MODELLIST)
                controllo=True
                while controllo:
                    model=input("-------------------\nSelect Model: ")
                    if int(model) in range(0,len(MODELLIST)):
                        model=MODELLIST[int(model)-1]
                        controllo=False
                if ('y' or 'Y') in input(f"Create drone {name} ({model})?(Yes/No)"):
                    HttpProtocol.createDrone(name, model)
            case 2:
                clear()
                getDroneList()
                name=parameter("Name")
                print(f'Drone {name}:\n{HttpProtocol.getDroneByName(name)}')
                
                input('\nPress any button to continue...')
                
            case 3:
                clear()
                getDroneList()
                
                input('\nPress any button to continue...')
                
            case 4:
                clear()
                getDroneList()
                name=parameter("Name")
                HttpProtocol.changeStatus(name)
                input('\nPress any button to continue...')
            case 5:
                clear()
                loop=False
            
            case _:
                clear()

            
    
    