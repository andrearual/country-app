import { Component, Input, EventEmitter, Output, OnInit , OnDestroy} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Region } from 'src/app/countries/Interfaces/region.type';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})

export class SearchBoxComponent implements OnInit, OnDestroy {

  // private tuboDeAgua: Subject<string> = new Subject<string>();
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubcription? : Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public inicialValue: string  = '';

  @Output()
  public onValue = new EventEmitter <string>();

  @Output()
  public onDebouncer = new EventEmitter <string>();

  ngOnInit(): void {
    //Observable
    this.debouncerSubcription = this.debouncer
    .pipe(
      debounceTime(500) // es como una barrera hasta que el usuario debe de emitir valores por medio segundo,
      // el Observable va emitir un valor
      )
      .subscribe(value => {
        this.onDebouncer.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubcription?.unsubscribe();
    console.log('destruido');
  }

  public emitValue(value : string): void {
    this.onValue.emit(value);
  }

  onKeyPress (searchTerm : string): void {
    this.debouncer.next( searchTerm );
  }

}
