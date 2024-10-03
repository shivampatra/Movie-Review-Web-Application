package dev.shivam.movies;

import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
@CrossOrigin(origins = "http://localhost:3000") // Replace with your React app's URL
public class MovieController {

    @Autowired
    private MovieService movieService;
    @GetMapping
    public ResponseEntity <List<Movie>> getAllMovies(){
//        return "All Movies!";
//   return  new ResponseEntity<String>("All Movies!", HttpStatus.OK);
    return new ResponseEntity<List<Movie>>(movieService.allMovies(),HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Movie>>(movieService.SingleMovie(imdbId), HttpStatus.OK);
    }

}



