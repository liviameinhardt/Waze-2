# Mini Waze

Developed as the final project for Data Structures and Algorithms.

[Watch the presentation](https://youtu.be/njsW6HlLDzc)

## Description

The final project is a simplified version of Waze. For this application, only the city of Rio de Janeiro is considered. The points and streets of the city are represented by a graph, whose nodes and edges were extracted from the `osmnx` library using Python. The program can query the shortest path or the fastest path using Dijkstra's or A* algorithms. Additionally, for A*, it is possible to visualize the points being considered by the algorithm.

## Group

> Ari Oliveira

> Lívia Meinhardt

> Luiz Luz

## Program Execution

To run the program locally, you need to install a server. You can also access the created virtual machine. 
Instructions for either option can be found [here](auxiliares/servidor.md).

## Console Interaction

If you wish to run the program via console, simply execute the program with the following parameters:

```s
./main.cgi "y1" "x1" "y2" "x2" "algorithm" "route_type"
```
Em que:

* `(y1,x1)` is the coordinate of the starting point
* `(y2,x2)` is the coordinate of the ending point
* `algorithm`  can be A* [1] or Dijkstra [0]
* `route_type` can be the fastest [1] or the shortest [0]

For exemple:

```s
cd /var/www/final*/back_organizado
./main.cgi -22.905479 -43.168620 -22.894177 -43.679636 1 1
```
