<template>
  
  
  
  
  <v-container fluid>

    <v-row v-if="this.state=='init'">
      <v-col>
             <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />

        <v-row justify="center" align="center" class="pa-8">
          
           <v-btn 
              outlined
              color="#00695C"
              v-on:click ="toggleState"  
            >
              Add book to Library

            </v-btn>
        
      </v-row>

      <v-row justify="center" align="center">
          
           <v-btn
              outlined
              color="red"
              v-on:click ="resetLocalStorage"  
            >
              Clear Local Storage Cache

            </v-btn>
        
      </v-row>
      </v-col>
    </v-row>  


    <v-row v-if="this.state=='form'">
      <v-col>
     <v-row>   
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      
  

      <v-row class="pa-8">  
      <h1>Search Google Book Library</h1>
      </v-row>  

      </v-row>

      <v-row class="pa-8">     
        <v-form>
      <v-container>
      <v-row>
       
          <v-text-field
            v-model="title"
            label="Title of the book"
            required
          ></v-text-field>
          
    
       </v-row> 
       <v-row> 
          <v-text-field
            v-model="author"
            label="Author"
            required
          ></v-text-field>
              
        
      </v-row>
      <v-row class="pa-8"> 
        <v-btn
              class="ma-2"
              outlined
              color="#00695C"
              v-on:click ="searchBooks"  
            >
              Search Book
            </v-btn>
              <v-btn
                class="ma-2"
                outlined
                color="red"
                v-on:click ="toggleState"
              >
                Cancel
              </v-btn>
      </v-row>        

    </v-container>
  </v-form>
  
  </v-row>


   
 
    <v-data-iterator
      :items="selection"
      :items-per-page.sync="productsPerPage"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="#4DB6AC"
          dark
          flat
          dense
        >
          <v-toolbar-title>My books to read</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row class="py-8">
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card  class="pa-5">
              <v-row>
               <v-btn
                   
                   class="ml-auto"
                    fab
                    dark
                    small
                    color="#DD2C00"
                    @click=removeFromCart(item)
                    >
                    <v-icon dark>
                     mdi-trash-can-outline
                    </v-icon>
                  
                </v-btn>
              </v-row>
              <v-card-title class="subheading font-weight-bold" v-if="item.volumeInfo.title">
                {{ item.volumeInfo.title }}
              </v-card-title>
            
             
              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Author:</v-list-item-content>
                  <v-list-item-content class="align-end" v-if="item.volumeInfo.authors">
                    {{ item.volumeInfo.authors[0] }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Isbn 13:</v-list-item-content>
                  <v-list-item-content class="align-end" v-if="item.volumeInfo.industryIdentifiers">
                    {{ item.volumeInfo.industryIdentifiers[0].type }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Description:</v-list-item-content>
                  <v-read-more-box>
                  <v-list-item-content class="align-start" v-if="item.volumeInfo.description">
                    {{ item.volumeInfo.description }}
                  </v-list-item-content>
                  </v-read-more-box>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content class="align-center" v-if="item.volumeInfo.imageLinks">
                     <v-img
                    :src="item.volumeInfo.imageLinks.thumbnail" 
                    contain
                    height="180px"
                    width="180px"
                  ></v-img>

                  </v-list-item-content>

                  <v-list-item-content class="align-center"  v-else>
                     <v-img
                    :src="require('../assets/unavailable.png')"
                    contain
                    height="180px"
                    width="180px"
                  ></v-img>

                  </v-list-item-content>
                </v-list-item>

                <v-list-item> 
                  <v-list-item-content>Icon:</v-list-item-content>
                  <v-list-item-content class="align-end" v-if="item.icon">
                    {{ item.icon }}
                  </v-list-item-content>
                </v-list-item>

      
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-toolbar
          class="mb-2"
          color="#00695C"
          dark
          flat
          dense
        >
          <v-toolbar-title class="subheading">
            Read your selection before adding new Books !
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-iterator>


  <v-row class="text-left pa-8">
      <div>
      <h1>Search Results</h1>
      </div>      
   </v-row>   

<!-- search result section  -->
<v-data-iterator
      :items="booklist"
      :items-per-page.sync="productsPerPage"
      hide-default-footer
    >
     

      <template v-slot:default="props">
        <v-row class="py-8">
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="pa-5">
               <v-row>  
               <v-btn v-if="selectionInclude(item)"
                   class="ml-auto"
                    fab
                    dark
                    small
                    elevation="6"
                    x-large
                    @click=removeFromCart(item)
                    color="#AD1457"
                    >
                    <v-icon dark>
                     mdi-heart
                    </v-icon>
                </v-btn>
                <v-btn v-else
                   class="ml-auto"
                    fab
                    dark
                    small
                    color="green"
                    @click=addToCart(item)
                    >
                    <v-icon dark>
                     mdi-plus-circle-outline
                    </v-icon>
                </v-btn>
                
              </v-row>
              <v-card-title class="subheading font-weight-bold">
                {{ item.volumeInfo.title }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Author:</v-list-item-content>
                  <v-list-item-content class="align-end" v-if="item.volumeInfo.authors" >
                    {{ item.volumeInfo.authors[0] }}
                  </v-list-item-content>
                </v-list-item>

               

                <v-list-item>
                  <v-list-item-content>Description:</v-list-item-content>
                  <v-read-more-box>
                  <v-list-item-content class="align-start" v-if="item.volumeInfo.description">
                    {{ item.volumeInfo.description }}
                  </v-list-item-content>
                  </v-read-more-box>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content class="align-center" v-if="item.volumeInfo.imageLinks">
                     <v-img
                    :src="item.volumeInfo.imageLinks.thumbnail" 
                    contain
                    height="180px"
                    width="180px"
                  ></v-img>
                    </v-list-item-content>

                  <v-list-item-content class="align-center" v-else>
                     <v-img
                    :src="require('../assets/unavailable.png')"
                    contain
                    height="180px"
                    width="180px"
                  ></v-img>

                  </v-list-item-content>
                </v-list-item>

                <v-list-item> 
                  <v-list-item-content>Icon:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.icon }}
                  </v-list-item-content>
                </v-list-item>

      
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-toolbar
          class="mb-2"
          color="#4DB6AC"
          dark
          flat
          dense
        >
          <v-toolbar-title class="subheading">
            End of Search
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-iterator>



<!--end search result section -->
      
        </v-col>
      </v-row>

  </v-container>



</template>

<script>
import axios from 'axios'
 


  export default {
    name: 'BookShelf',
    data () { 
      return {
      state:'init',  
      title:'',
      author:'',
      src:'',
      booklist:[],
      selection: [],
       productsPerPage: 50,
      }
    },
    mounted() {
    
    if(localStorage.getItem('booklist')) {
      this.booklist=JSON.parse(localStorage.getItem('booklist'));
     
    }
    if(localStorage.getItem('selection')) {
      this.selection=JSON.parse(localStorage.getItem('selection'))
                          
    }
    if (localStorage.getItem('title')) {
      this.title = localStorage.getItem('title');
    }
    if (localStorage.getItem('author')) {
      this.author = localStorage.getItem('author');
    }
    if (localStorage.getItem('state')) {
      this.state = localStorage.getItem('state');
    } 
    console.log('App mounted !');
    
  },
   watch: {

     selection: {
          handler() { console.log('Selection has changed'); 
          localStorage.setItem('selection', JSON.stringify(this.selection))
          },
           deep: true,
        },
     booklist: {
          handler() { console.log('Booklist changed!'); 
          localStorage.setItem('booklist', JSON.stringify(this.booklist))
                                
          
          },
          deep: true,
        },

        

        title: {
          handler() { console.log('Title has changed'); 
          localStorage.setItem('title', this.title)
          },
           deep: true,
        },

        author: {
          handler() { console.log('Author has changed'); 
          localStorage.setItem('author', this.author)
          },
           deep: true,
        },


        state: {
          handler() { console.log('State has changed'); 
          localStorage.setItem('state', this.state)
          },
           deep: true,
        }

    },
    methods: {
    searchBooks: function () {
    let doubloon;
    let targetUrl= `https://www.googleapis.com/books/v1/volumes?q=`+this.title+`+inauthor:`+this.author+`&key=AIzaSyCRe2tcgjhsZgUjzMJ_aJNI-7qY3yH381w`
    console.log(targetUrl)  
    let searchResult = axios  
      .get(targetUrl)  
      .then(response =>(this.booklist = response.data.items ) )
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
   
    
      

  
  },
  addToCart: function(book){

    console.log("add to cart")
    let item
    let test=false
    
          for (item of this.selection) {
            console.log("itemid="+item.id+" book.id="+book.id) 
            console.log(item.id==book.id)
            
             if(item.id==book.id) {
                test=true
                this.$alert("This book is already in your list !!");
              }
            }

        
            if(test==false)              
                {
                this.selection.push(book)
                }

  },


  toDisplay: function(bookid){
   
   if(this.booklist.includes(book)){
    this.booklist.pop(book)
    console.log(this.booklist)
     
    }
    
  },

  removeFromCart: function(book){
   const filtersList = this.selection.filter(element => element !== book)
      this.selection=filtersList 
    
    
  },
  
  selectionInclude: function(book){



     if(this.selection.includes(book) && this.booklist.includes(book)  ){

       console.log("selectionInclude returned id = "+book.id)

    return true
    }
      else if (this.booklist.includes(book)){
        return false

      }
  },

  toggleState: function(){
    console.log("togglState")

    if(this.state=="init") {
      this.state="form"
      
    } else {

      this.state="init"
       
    }
  },

resetLocalStorage : function(){
   

        localStorage.clear()
         console.log("reset localStorageCache")

  },

findObjectByKey : function(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
                }
        }
    return null;
    }
   

  }


}
  
</script>